import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import RequestHandler from './RequestHandler';

export default class AxiosClient {
    private _client!: AxiosInstance;

    get client(): AxiosInstance {
        return this._client;
    };

    public createClient(options: AxiosRequestConfig): void {
        this._client = axios.create(options);
    };
};