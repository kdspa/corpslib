import { ICompetition } from '../interfaces/API';

export default class Competition {
    private _data: ICompetition;
    
    constructor(api_obj: ICompetition) {
        this._data = api_obj;
    }
}
