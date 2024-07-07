import { IEvent } from '../interfaces/API';

export default class Event {
    private _data: IEvent;

    constructor(api_obj: IEvent) {
        this._data = api_obj;
    };

    get id() {
        return this._data.id;
    }

    get name() {
        return this._data.name;
    }

    get slug() {
        return this._data.slug;
    }

    get locationCity() {
        return this._data.locationCity;
    }

    get locationState() {
        return this._data.locationState;
    }

    get timezone() {
        return this._data.timezone;
    }

    get tickets() {
        return this._data.tickets;
    }

    get ticketsOnSale() {
        return this._data.ticketsOnSale;
    }

    get sponsor() {
        return this._data.sponsor;
    }

    get livestream() {
        return this._data.livestream;
    }

    get thumbnail() {
        return this._data.thumbnail;
    }

    get startDate() {
        return this._data.startDate;
    }

    get startTime() {
        return this._data.startTime;
    }

    get schedules() {
        return this._data.schedules;
    }

    get venue() {
        return this._data.venue;
    }

    get image() {
        return this._data.image;
    }

    get ticketingMapImage() {
        return this._data.ticketingMapImage;
    }

    get googleMapsImage() {
        return this._data.googleMapsImage;
    }
}