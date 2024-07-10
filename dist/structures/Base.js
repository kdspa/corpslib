"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    toJSON() {
        const copy = {};
        for (const key in this) {
            if (!this.hasOwnProperty(key) || key.startsWith('_')) {
                continue;
            }
            if (!this[key]) {
                copy[key] = this[key];
            }
            else if (this[key] instanceof Set) {
                copy[key] = Array.from(this[key]);
            }
            else if (this[key] instanceof Map) {
                copy[key] = Array.from(this[key].values());
            }
            else if (this[key].toJSON != undefined) {
                copy[key] = this[key].toJSON();
            }
            else {
                copy[key] = this[key];
            }
        }
        return copy;
    }
    inspect() {
        return this.toJSON();
    }
}
exports.default = Base;
