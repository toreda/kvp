import {jsonType} from '@toreda/types';
import {StrongMap} from '../map';
import {StrongType} from '../strong-type';
import {StrongMapParserOptions as Options} from './parser/options';
import {StrongMapParserState as State} from './parser/state';

export class StrongMapParser {
	public parse(map: StrongMap, json: jsonType, options?: Options): boolean {
		if (!map) {
			return false;
		}

		if (!json) {
			return false;
		}

		const state = new State(options);

		return this.parseMap(map, json, state);
	}

	public parseKey(key: StrongType<unknown>, value: unknown, _state: State): void {
		if (!key) {
			return;
		}

		if (key.typeId !== 'StrongType') {
			return;
		}

		key(value);
	}

	public parseMap(map: StrongMap, json: jsonType, state: State): boolean {
		if (!map) {
			return false;
		}

		if (typeof json === 'undefined' || json === {}) {
			return false;
		}

		if (state.visited.has(map)) {
			return false;
		}

		state.visited.add(map);
		const keys: string[] = Object.keys(map);

		for (const keyName of keys) {
			const child = map[keyName];
			const jsonObj = json[keyName];

			if (child instanceof StrongMap) {
				if (Array.isArray(jsonObj) || typeof jsonObj !== 'object' || jsonObj == null) {
					continue;
				}

				this.parseMap(child, jsonObj, state);
			} else if (child?.typeId === 'StrongType') {
				this.parseKey(child, jsonObj, state);
			} else if (typeof child !== 'object') {
				this.parseKey(child, jsonObj, state);
			} else {
				this.parseMap(child, jsonObj, state);
			}
		}

		return true;
	}
}
