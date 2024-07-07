import https, { RequestOptions } from 'https';
import { version } from '../package.json';
import * as Endpoints from './Endpoints';
import { ICorps, IEvent, ISchedule, IVenue } from './interfaces/API';


export interface Ratelimit {
	limit: number;
	remaining: number;
	localRemaining: number;
	reset: Date;
}

export class DCIClient {
    private options: any;
    private requestQueue: (() => Promise<any>)[] = [];
    private ratelimit: Ratelimit;

    /**
     * Create a new API client
     */
    constructor() {
        this.options = Object.assign({
            api: {
                headers: {
                    "User-Agent": `kdspa/CorpsLib v${version}  - https://github.com/kdspa/corpslib`,
                }
            }
        });

        this.ratelimit = {
			remaining: 60,
			localRemaining: 60,
			limit: 60,
			reset: new Date()
		};
    }

    /**
     * Get a list of upcoming events
     */
    public getEvents() {}

    /**
     * Get a event
     * @param name Event name
     * @param season Season (year)
     */
    public getEvent(name: string, season?: string) {}

    /**
     * Get a list of competitions
     */
    public getCompetitions() {}

    /**
     * Get a competition
     * @param name Competition name
     * @param season Season (year)
     */
    public getCompetition(name: string, season?: string) {}

    /** 
     * Get a list of corps registered with DCI
    */
    public getAllCorps() {}

    /** 
     * Get a specific corps 
     * @param name Corps name
    */
    public getCorps(name: string) {}

    /**
     * Get sponsors
     */
    public getSponsors() {}

    /**
     * Get a sponsor
     * @param name Sponsor name
     */
    public getSponsor(name: string) {}

    private _queueRequest<T>(method: string, endpoint: string, data?: any) {
        return new Promise<T>((resolve, reject) => {
            const actualCall = async () => {
                await this._makeRequest<T>(method, endpoint, data).then(resolve, reject);
            };

            this.requestQueue.push(actualCall);
            this._advanceQueue;
        })
    }

    private async _advanceQueue() {
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
            this._advanceQueue();
        }, waitTime);
    }

    private _makeRequest<T>(method: string, path: string, body: any | string = null): Promise<T> {
        return new Promise((fulfill, reject) => {
            let data = '';
            const req = https.request(
                path,
                Object.assign({ method: method }, this.options.api),
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
