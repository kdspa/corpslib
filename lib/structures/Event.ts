import Base from './Base';
import { IEvent } from '../interfaces/API';
import * as cheerio from 'cheerio';

export default class Event extends Base {
    private _data: IEvent;

    constructor(data: any) {
        super();
        this._data = this.format(data);
    };  

    /**
     * Returns event name
     */
    get name() {
        return this._data.name;
    }

    /**
     * Returns event city
     */
    get location() {
        return this._data.location;
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
     * Returns event lineup
     */
    get lineup() {
        return this._data.lineup;
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

    public format(data: any): IEvent {
        const $ = cheerio.load(data.data);
        let meta: IEvent = {
            name: $('div.inner-hero-inner > h1').text() || '',
            location: $('span.location').text().trim() || '',
            timezone: $('div.lineup-times-table > div.common-dis > p').text().replace('All times ', '').replace(' and subject to change', '') || '',
            tickets: $('.buy-tickets-btn a.btn').attr('href') || '',
            ticketsOnSale: '', // I don't know what this will look like in the HTML yet
            sponsor: $('.event-sponsor').text().replace('Presented by ', '') || '',
            livestream: $('.buy-tickets-btn .watch-live').attr('href') || '',
            image: $('div.hero-section > img').attr('src') || '',
            startDate: $('div.inner-hero-inner > p').text().split(' ').slice(0, -2).join(' ') || '',
            startTime: $('div.inner-hero-inner > p').text().split(' ').slice(-2).join(' ').trim() || '',
            lineup: [],
            venue: {
                name: $('div.address-info > address').html()!.toString().trim().split('<br>')[0] || '',
                address: $('div.address-info > address').html()!.toString().trim().split('<br>')[1] || '',
                city: $('div.address-info > address').html()!.toString().trim().split('<br>')[2] || '',
            },
        };
        let table = $('table > tbody');
        let lineup = [];
        let rows = table.find('tr');
        for (let row of rows) {
            const rowData = {
                time: $(row).find('td').html() || '',
                name: $(row).find('td > strong').text() || '',
                location: '',
            };
            $(row).find('td > strong').remove();
            rowData.location = $(row).find('td:contains(" -")').text().slice(3) || '';
            lineup.push(rowData);
        };
        meta.lineup = lineup;
        return meta;
    }
};