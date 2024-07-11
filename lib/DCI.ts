import * as Endpoints from './Endpoints';
import RequestHandler from './RequestHandler';
import { Base, Competition, Corps, Event, Venue } from './structures';
import { ICorps, IEvent, ISchedule, IVenue } from './interfaces/API';

export class DCIClient {
    private requestHandler: RequestHandler;

    /**
     * Create a new API client
     */
    constructor(options?: any) {
        this.requestHandler = new RequestHandler();
    }

    /**
     * Get a list of upcoming events
     */
    public getEvents() {
        return this.requestHandler.queue<IEvent>(
            'GET',
            Endpoints.EVENTS()
        ).then((event) => new Event(event));
    }

    /**
     * Get a event
     * @param name Event name
     * @param season Season (year)
     */
    public getEvent(name: string, season?: string): any {
        return this.requestHandler.queue<IEvent>(
			"GET",
			Endpoints.EVENT(name, season)
		).then((event) => new Event(event));
    }

    /**
     * Get a list of competitions
     */
    public getCompetitions() {}

    /**
     * Get a competition
     * @param name Competition name
     * @param season Season (year)
     */
    public getCompetition(name: string, season?: string) {
        return this.requestHandler.queue<Competition>(
            'GET',
            Endpoints.COMPETITION(name, season)
        ).then((comp) => new Competition(comp));
    }

    /** 
     * Get a list of corps registered with DCI
    */
    public getAllCorps() {}

    /** 
     * Get a specific corps 
     * @param name Corps name
    */
    public getCorps(name: string) {
        return this.requestHandler.queue<ICorps>(
            'GET',
            Endpoints.CORPS(name)
        ).then((corps) => new Corps(corps));
    }

    /**
     * Get sponsors
     */
    public getSponsors() {}

    /**
     * Get a sponsor
     * @param name Sponsor name
     */
    public getSponsor(name: string) {}
}
