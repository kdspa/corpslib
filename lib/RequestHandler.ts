import https, { RequestOptions } from 'https';
import * as Endpoints from './Endpoints';

export interface Ratelimit {
	limit: number;
	remaining: number;
	localRemaining: number;
	reset: Date;
}

export default class RequestHandler {
    public userAgent: string;
    private options: any;
    private requestQueue: (() => Promise<any>)[] = [];
    private ratelimit: Ratelimit;

    /**
     * Create a new RequestHandler client
     */
    constructor(options?: any) {
        this.options = Object.assign({
            baseURL: Endpoints.BASE,
            domain: 'api.dci.org',
        },
        options
        );

        this.userAgent = `kdspa/CorpsLib v${require('../package.json').version} - https://github.com/kdspa/corpslib,`;

        this.ratelimit = {
            remaining: 60,
            localRemaining: 60,
            limit: 60,
            reset: new Date()
        };
    }

    public queue<T>(method: string, endpoint: string, data?: any) {
        return new Promise<T>((resolve, reject) => {
            const actualCall = async () => {
                await this.request<T>(method, endpoint, data).then(resolve, reject);
            };

            this.requestQueue.push(actualCall);
            this.advanceQueue();
        })
    }

    private async advanceQueue() {
        // No more requests
        if (this.requestQueue.length === 0) return;

        if (this.ratelimit.localRemaining > 0) {
            // Not ratelimited, keep making requests
            const jobs = this.requestQueue.splice(0, this.ratelimit.localRemaining);
            this.ratelimit.localRemaining -= jobs.length;
            await Promise.allSettled(jobs.map((job) => job()));
            if (this.ratelimit.localRemaining > this.ratelimit.remaining) {
                this.ratelimit.localRemaining = this.ratelimit.remaining;
            }
            return;
        }

        // Ratelimited, wait
        const waitTime = this.ratelimit.reset.getTime() - Date.now();
        setTimeout(() => {
            this.ratelimit.remaining = this.ratelimit.limit;
            this.ratelimit.localRemaining = this.ratelimit.limit;
            this.advanceQueue();
        }, waitTime);
    }

    private request<T>(method: string, path: string, body: any | string = null): Promise<T> {
        let url = `https://${this.options.domain}/${this.options.baseURL}` + path;
        return new Promise((fulfill, reject) => {
            let data = '';
            const req = https.request(
                url,
                Object.assign({ method: method, 'User-Agent': this.userAgent }),
                (res) => {
                    this.ratelimit.remaining = Number(res.headers['x-ratelimit-remaining']);
                    this.ratelimit.limit = Number(res.headers['x-ratelimit-limit']);
                    this.ratelimit.reset = new Date(Number(res.headers['x-ratelimit-reset']) * 1000);

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        if (res.statusCode === 200) {
                            fulfill(JSON.parse(data) as T);
                        } else {
                            reject(Object.assign({ statusCode: res.statusCode }, JSON.parse(data)));
                        }
                    });

                    res.on('error', (e) => {
                        reject(e);
                    })
                }
            );
            
            if (!body) {
                req.end();
            } else {
                if (typeof body == 'object') {
                    req.end(JSON.stringify(body));
                } else {
                    req.end(body);
                }
            }
        });
    }
}
