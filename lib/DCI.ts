import * as Endpoints from './Endpoints';
import AxiosClient from './AxiosClient';
import RequestHandler from './RequestHandler';
import type { AxiosInstance } from 'axios';
import { Base, Competition, Corps, Event, Sponsor, Venue } from './structures';
import { ICorps, IEvent, ISchedule, ISponsor, IVenue } from './interfaces/API';

export class DCIClient {
    private axios: AxiosClient
    public client: AxiosInstance
    private requestHandler: RequestHandler;

    /**
     * Create a new API client
     */
    constructor(options?: any) {
        this.axios = new AxiosClient();
        this.axios.createClient(options)
        this.client = this.axios.client;
        this.requestHandler = new RequestHandler(this.client);
    }

    /**
     * Get a list of upcoming events
     */
    public getEvents() {
        let event = this.requestHandler.queue('GET', Endpoints.EVENTS);
        return new Event(event);
    };

    /**
     * Get a event
     * @param name Event name
     * @param season Season (year)
     */
    public async getEvent(name: string): Promise<Event> {
        let event = await this.requestHandler.queue('GET', Endpoints.EVENT(name));
		return new Event(event);
    };

    /** 
     * Get a list of corps registered with DCI
    */
    public getAllCorps() {}

    /** 
     * Get a specific corps 
     * @param name Corps name
    */
    // public getCorps(name: string) {
    //     let corps = this.requestHandler.queue('GET', Endpoints.CORPS(name));
    //   return new Corps(corps);
    // }

    /**
     * Get sponsors
     */
    // public getSponsors() {}

    /**
     * Get a sponsor
     * @param name Sponsor name
     */
    // public getSponsor(name: string) { // Need to actually create the sponsor class lol
    //     let sponsor = this.requestHandler.queue('GET', Endpoints.SPONSOR(name))
    //     return new Sponsor(sponsor);
    // }
}
