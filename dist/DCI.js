"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DCIClient = void 0;
const https_1 = __importDefault(require("https"));
// import { version } from '../package.json';
const Endpoints = __importStar(require("./Endpoints"));
const structures_1 = require("./structures");
class DCIClient {
    /**
     * Create a new API client
     */
    constructor(options) {
        this.requestQueue = [];
        this.options = Object.assign({
            api: {
                headers: {
                    "User-Agent": `kdspa/CorpsLib v1.0.0  - https://github.com/kdspa/corpslib`,
                }
            }
        }, options);
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
    getEvents() { }
    /**
     * Get a event
     * @param name Event name
     * @param season Season (year)
     */
    getEvent(name, season) {
        return this._queueRequest("GET", Endpoints.EVENTS(name, season)).then((event) => new structures_1.Event(event));
    }
    /**
     * Get a list of competitions
     */
    getCompetitions() { }
    /**
     * Get a competition
     * @param name Competition name
     * @param season Season (year)
     */
    getCompetition(name, season) { }
    /**
     * Get a list of corps registered with DCI
    */
    getAllCorps() { }
    /**
     * Get a specific corps
     * @param name Corps name
    */
    getCorps(name) { }
    /**
     * Get sponsors
     */
    getSponsors() { }
    /**
     * Get a sponsor
     * @param name Sponsor name
     */
    getSponsor(name) { }
    _queueRequest(method, endpoint, data) {
        return new Promise((resolve, reject) => {
            const actualCall = () => __awaiter(this, void 0, void 0, function* () {
                yield this._makeRequest(method, endpoint, data).then(resolve, reject);
            });
            this.requestQueue.push(actualCall);
            this._advanceQueue();
        });
    }
    _advanceQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            // No more requests
            if (this.requestQueue.length === 0)
                return;
            if (this.ratelimit.localRemaining > 0) {
                // Not ratelimited, keep making requests
                const jobs = this.requestQueue.splice(0, this.ratelimit.localRemaining);
                this.ratelimit.localRemaining -= jobs.length;
                yield Promise.allSettled(jobs.map((job) => job()));
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
        });
    }
    _makeRequest(method, path, body = null) {
        return new Promise((fulfill, reject) => {
            let data = '';
            const req = https_1.default.request(path, Object.assign({ method: method }, this.options.api), (res) => {
                this.ratelimit.remaining = Number(res.headers['x-ratelimit-remaining']);
                this.ratelimit.limit = Number(res.headers['x-ratelimit-limit']);
                this.ratelimit.reset = new Date(Number(res.headers['x-ratelimit-reset']) * 1000);
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        fulfill(JSON.parse(data));
                    }
                    else {
                        reject(Object.assign({ statusCode: res.statusCode }, JSON.parse(data)));
                    }
                });
                res.on('error', (e) => {
                    reject(e);
                });
            });
            if (!body) {
                req.end();
            }
            else {
                if (typeof body == 'object') {
                    req.end(JSON.stringify(body));
                }
                else {
                    req.end(body);
                }
            }
        });
    }
}
exports.DCIClient = DCIClient;
