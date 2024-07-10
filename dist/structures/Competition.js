"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
class Competition extends Base_1.default {
    constructor(data) {
        super();
        this._data = data;
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
exports.default = Competition;
