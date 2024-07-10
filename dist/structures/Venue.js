"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
class Venue extends Base_1.default {
    constructor(api_obj) {
        super();
        this._data = api_obj;
    }
    ;
    get name() {
        return this._data.name;
    }
    get address() {
        return this._data.address;
    }
    get zipcode() {
        return this._data.zipcode;
    }
    get fieldHashmarks() {
        return this._data.fieldHashmarks;
    }
    get fieldHashmarksType() {
        return this._data.fieldHashmarksType;
    }
    get goalPosts() {
        return this._data.goalPosts;
    }
    get fieldElectricity() {
        return this._data.fieldElectricity;
    }
    get americanFlagLocation() {
        return this._data.americanFlagLocation;
    }
    get tunnelHeight() {
        return this._data.tunnelHeight;
    }
    get videoBoard() {
        return this._data.videoBoard;
    }
    get airConditioning() {
        return this._data.airConditioning;
    }
    get clearBagVenue() {
        return this._data.clearBagVenue;
    }
    get bagPolicy() {
        return this._data.bagPolicy;
    }
    get bagPolicyDescription() {
        return this._data.bagPolicyDescription;
    }
    get marketplaceLocation() {
        return this._data.marketplaceLocation;
    }
    get marketplaceElectricity() {
        return this._data.marketplaceElectricity;
    }
    get spectatorEntrance() {
        return this._data.spectatorEntrance;
    }
    get spectatorReEntry() {
        return this._data.spectatorReEntry;
    }
    get willCallLocation() {
        return this._data.willCallLocation;
    }
    get concessions() {
        return this._data.concessions;
    }
    get ambulanceLocation() {
        return this._data.ambulanceLocation;
    }
    get micsOnField() {
        return this._data.micsOnField;
    }
    get soundOrdinance() {
        return this._data.soundOrdinance;
    }
    get ticketTakers() {
        return this._data.ticketTakers;
    }
    get boxOfficeVolunteers() {
        return this._data.boxOfficeVolunteers;
    }
    get ushers() {
        return this._data.ushers;
    }
    get security() {
        return this._data.security;
    }
    get seatNumbering() {
        return this._data.seatNumbering;
    }
    get seatSize() {
        return this._data.seatSize;
    }
    get cashless() {
        return this._data.cashless;
    }
    ;
}
exports.default = Venue;
