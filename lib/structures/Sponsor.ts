import Base from './Base';
import { ISponsor } from '../interfaces/API';

export default class Sponsor extends Base {
    private _data: ISponsor;

    constructor(api_obj: ISponsor) {
        super();
        this._data = api_obj;
    };
}