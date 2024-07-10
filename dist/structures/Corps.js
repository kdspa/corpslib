"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
class Corps extends Base_1.default {
    constructor(api_obj) {
        super();
        this._data = api_obj;
    }
    get id() {
        return this._data.id;
    }
    get name() {
        return this._data.name;
    }
    get type() {
        return this._data.type;
    }
    get website() {
        return this._data.website;
    }
    get facebook() {
        return this._data.facebook;
    }
    get twitter() {
        return this._data.twitter;
    }
    get youtube() {
        return this._data.youtube;
    }
    get about() {
        return this._data.about;
    }
    get status() {
        return this._data.status;
    }
    get location() {
        return this._data.displayCity;
    }
    get corpsLogo() {
        return this._data.corpsLogo;
    }
    get corpsPhoto() {
        return this._data.corpsPhoto;
    }
    get mmdlAudio() {
        return this._data.corpsMMDLLinkAudio;
    }
    get mmdlVideo() {
        return this._data.corpsMMDLLinkVideo;
    }
    get entityType() {
        return this._data.entityType;
    }
    get slug() {
        return this._data.slug;
    }
    get auditions() {
        return this._data.auditions;
    }
}
exports.default = Corps;
