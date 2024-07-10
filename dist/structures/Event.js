"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
class Event extends Base_1.default {
    constructor(api_obj) {
        super();
        this._data = api_obj;
    }
    ;
    /**
     * Returns event ID
     */
    get id() {
        return this._data.id;
    }
    /**
     * Returns event name
     */
    get name() {
        return this._data.name;
    }
    /**
     * Returns event url slug
     */
    get slug() {
        return this._data.slug;
    }
    /**
     * Returns event city
     */
    get locationCity() {
        return this._data.locationCity;
    }
    /**
     * Returns event state
     */
    get locationState() {
        return this._data.locationState;
    }
    /**
     * Returns event timezone
     */
    get timezone() {
        return this._data.timezone;
    }
    /**
     * Returns ticket link
     */
    get tickets() {
        return this._data.tickets;
    }
    /**
     * Returns onsale date
     */
    get ticketsOnSale() {
        return this._data.ticketsOnSale;
    }
    /**
     * Returns presenting sponsor
     */
    get sponsor() {
        return this._data.sponsor;
    }
    /**
     * Returns Flo livestream link (if applicable)
     */
    get livestream() {
        return this._data.livestream;
    }
    /**
     * Event thumbnail
     */
    get thumbnail() {
        return this._data.thumbnail;
    }
    /**
     * Event start date
     */
    get startDate() {
        return this._data.startDate;
    }
    /**
     * Event start time
     */
    get startTime() {
        return this._data.startTime;
    }
    /**
     * Returns event schedule
     */
    get schedules() {
        return this._data.schedules;
    }
    /**
     * Returns event venue
     */
    get venue() {
        return this._data.venue;
    }
    /**
     * Event image
     */
    get image() {
        return this._data.image;
    }
    /**
     * Ticket map image
     */
    get ticketingMapImage() {
        return this._data.ticketingMapImage;
    }
    /**
     * Static Google maps image for venue location
     */
    get googleMapsImage() {
        return this._data.googleMapsImage;
    }
}
exports.default = Event;
