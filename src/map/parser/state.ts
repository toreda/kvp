import {StrongMapParserOptions as Options} from './options';

export class StrongMapParserState {
	public visited: Set<unknown>;

	constructor(_options?: Options) {
		this.visited = new Set();
	}
}
