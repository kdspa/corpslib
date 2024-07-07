import Base from './Base';
import { ICompetition } from '../interfaces/API';

export default class Competition extends Base {
    private _data: ICompetition;
    
    constructor(data: ICompetition) {
        super();
        this._data = data
    }

    get scores() {
        return this._data.scores;
    }

    get competition() {
        return this.scores[0].competition;
    }

    get groupTypes() {
        return this.competition.groupTypes;
    }
    
    get name() {
        return this.competition.eventName;
    }

    get location() {
        return this.competition.location;
    }

    get date() {
        return this.competition.date;
    }

    get competitionLevel() {
        return this.competition.competitionLevel;
    }

    get chiefJudge() {
        return this.competition.chiefJudge;
    }

    get scoresReleased() {
        return this.competition.scoresReleased;
    }

    get recapReleased() {
        return this.competition.recapReleased;
    }

    get season() {
        return this.competition.seasonName;
    }

    get slug() {
        return this.competition.slug;
    }
}
