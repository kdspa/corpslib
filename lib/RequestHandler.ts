import https, { RequestOptions } from 'https';
import type { AxiosInstance, AxiosResponse } from 'axios';
import * as Endpoints from './Endpoints';
import * as cheerio from 'cheerio';

export interface Ratelimit {
	limit: number;
	remaining: number;
	localRemaining: number;
	reset: Date;
}

export default class RequestHandler {
    public client: AxiosInstance;
    private requestQueue: (() => Promise<any>)[] = [];
    private ratelimit: Ratelimit;

    /**
     * Create a new RequestHandler client
     */
    constructor(client: AxiosInstance, options?: any) {
        this.client = client;
        this.ratelimit = {
            remaining: 60,
            localRemaining: 60,
            limit: 60,
            reset: new Date()
        };
    }

    public async queue(method: string, endpoint: string, data?: any): Promise<AxiosResponse> {
        return await this.request(method, endpoint, data);
    };


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

    private async request(method: string, path: string, data?: any): Promise<AxiosResponse> {
        const response = await this.client.request({ method: method, url: path });
        return response;
    };
}
