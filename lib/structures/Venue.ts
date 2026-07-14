import Base from './Base';
import { IVenue } from '../interfaces/API';

export default class Venue extends Base {
    private _data: IVenue;

    constructor(api_obj: IVenue) {
        super();
        this._data = api_obj;
    };

    get name() {
        return this._data.name;
    }

    get address() {
        return this._data.address;
    }

    get city() {
        return this._data.city;
    }
}