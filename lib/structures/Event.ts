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
        console.log(data);
        const $ = cheerio.load(data);   
        let meta: IEvent = {
            name: $('h1.inner-hero-inner').text(),
            location: $('span.location').text(),
            timezone: $('p.lineup-times-table').text().replace('All times ', '').replace(' and subject to change.', ''),
            tickets: $('.buy-tickets-btn a.btn').attr('href') || '',
            ticketsOnSale: '',
            sponsor: $('.event-sponsor').text(),
            livestream: $('.buy-tickets-btn .watch-live').attr('href') || '',
            image: $('img.hero-section').attr('src') || '',
            startDate: $('p.inner-hero-inner').text().split(' ').slice(0, -2).join(' '),
            startTime: $('p.inner-hero-inner').text().split(' ').slice(-2).join(' '),
            lineup: [],
            venue: {
                name: $('address.address-info').text().split('<br>')[0] || '',
                address: $('address.address-info').text().split('<br>')[1] || '',
                city: $('address.address-info').text().split('<br>')[2] || '',
            },
        };
        let table = $('table.table-responsive-common-table')
        let lineup = [];
        let rows = table.find('tr')
        for (let row of rows) {
            let cells = $(row).children('td').toArray();
            const rowData = {
                time: $(cells[0]).text(),
                name: $(cells[1]).text().split(' - ').slice(0, -1).join(' '),
                location: $(cells[2]).text().split(' - ').slice(-1).join(' ') || '',
            };
            lineup.push(rowData);
        };
        return meta;
    }
};