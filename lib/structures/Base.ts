export default class Base {
    public toJSON(): object {
		const copy: {[key: string]: any} = {};

		for (const key in this) {
			if (!this.hasOwnProperty(key) || key.startsWith('_')) {
				continue;
			}

			if (!this[key]) {
				copy[key] = this[key];
			} else if (<any>this[key] instanceof Set) {
				copy[key] = Array.from(<any>this[key]);
			} else if (<any>this[key] instanceof Map) {
				copy[key] = Array.from((<any>this[key]).values());
			} else if ((<any>this[key]).toJSON != undefined) {
				copy[key] = (<any>this[key]).toJSON();
			} else {
				copy[key] = this[key];
			}
		}

		return copy;
	}

    public inspect(): object {
		return this.toJSON();
	}
}