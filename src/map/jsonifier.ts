import {StrongMap} from '../map';
import {StrongType} from '../strong-type';
import {StrongMapJsonifierOptions as Options} from './jsonifier/options';
import {StrongMapJsonifierState as State} from './jsonifier/state';

export class StrongMapJsonifier {
	public jsonify(map: StrongMap, options?: Options): Record<string, unknown> {
		if (!map) {
			throw Error('Failed to jsonify map - map arg missing.');
		}

		const state = new State(options);

		return this.jsonifyMap(map, state);
	}

	public jsonifyMap(map: StrongMap, state: State): Record<string, unknown> {
		const result = {};

		const keys = Object.keys(map);

		for (const keyName of keys) {
			const child = map[keyName];

			if (child == null) {
				result[keyName] = this.jsonifyKey(child, state);
			} else if (child instanceof StrongMap) {
				result[keyName] = this.jsonifyMap(child, state);
			} else if (child.typeId === 'StrongType') {
				result[keyName] = this.jsonifyKey(child, state);
			} else if (typeof child !== 'object') {
				result[keyName] = this.jsonifyKey(child, state);
			} else if (Array.isArray(child)) {
				result[keyName] = this.jsonifyKey(child, state);
			} else {
				result[keyName] = this.jsonifyKey(child, state);
			}
		}

		return result;
	}

	public jsonifyKey(key: unknown, _state: State): unknown {
		if (key === undefined) {
			return undefined;
		}

		const assumeKeyIsStrongType = key as StrongType<unknown>;

		if (assumeKeyIsStrongType?.typeId === 'StrongType') {
			return assumeKeyIsStrongType();
		}

		return key;
	}
}
