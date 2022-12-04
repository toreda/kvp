/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2021 Toreda, Inc.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:

 * 	The above copyright notice and this permission notice shall be included in all
 * 	copies or substantial portions of the Software.
 *
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * 	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * 	SOFTWARE.
 *
 */

import type {Bool} from '../../src/bool';
import {Data} from '@toreda/types';
import type {Int} from '../../src/int';
import {MapParser} from '../../src/map/parser';
import {MapParserState} from '../../src/map/parser/state';
import {StrongMap} from '../../src/strong/map';
import type {Text} from '../../src/text';
import {boolMake} from '../../src/bool/make';
import {intMake} from '../../src/int/make';
import {textMake} from '../../src/text/make';

const MOCK_VALUE = 11091;

class SampleGroupOne extends StrongMap {
	public key_one_one: Int;
	public key_one_two: Text;
	public key_one_three: Text;

	constructor() {
		super();
		this.key_one_one = intMake(0);
		this.key_one_two = textMake('');
		this.key_one_three = textMake('');
	}
}

class SampleGroupTwo extends StrongMap {
	public key_two_one: Bool;
	public key_two_two: Bool;
	public key_two_three: Bool;

	constructor() {
		super();
		this.key_two_one = boolMake(false);
		this.key_two_two = boolMake(false);
		this.key_two_three = boolMake(false);
	}
}

class SampleGroupThree extends StrongMap {
	public key_three_one: Text;
	public key_three_two: Text;
	public key_three_three: Text;

	constructor() {
		super();
		this.key_three_one = textMake('');
		this.key_three_two = textMake('');
		this.key_three_three = textMake('');
	}
}

class SampleMap extends StrongMap {
	public groupOne: SampleGroupOne;
	public groupTwo: SampleGroupTwo;
	public groupThree: SampleGroupThree;

	constructor(data?: Data) {
		super();
		this.groupOne = new SampleGroupOne();
		this.groupTwo = new SampleGroupTwo();
		this.groupThree = new SampleGroupThree();

		this.parse(data);
	}
}

describe('Parser', () => {
	let sampleMap: StrongMap;
	let instance: MapParser;
	const state = new MapParserState();

	beforeAll(() => {
		sampleMap = new StrongMap();
		instance = new MapParser();
	});

	describe('Implementation', () => {
		describe('parse', () => {
			let parseMapSpy: jest.SpyInstance;

			beforeAll(() => {
				parseMapSpy = jest.spyOn(instance, 'parseMap');
			});

			beforeEach(() => {
				parseMapSpy.mockReset();
			});

			afterAll(() => {
				parseMapSpy.mockRestore();
			});

			it('should not call parseMap when group arg is missing', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const json = {};
				instance.parse(undefined as any, json);
				expect(parseMapSpy).not.toHaveBeenCalled();
			});

			it('should return false when group arg is missing', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const json = {};
				expect(instance.parse(undefined as any, json)).toBe(false);
			});

			it('should not call parseMap when group arg is missing', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const json = {};
				const options = {};
				instance.parse(undefined as any, json);
				expect(parseMapSpy).not.toHaveBeenCalled();
			});

			it('should return false when group arg is missing', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const json = {};
				expect(instance.parse(undefined as any, json)).toBe(false);
			});

			it('should return false when json arg is missing', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const group = new StrongMap();
				expect(instance.parse(group, undefined as any)).toBe(false);
			});

			it('should not call parseMap when json arg is missing', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const group = new StrongMap();
				instance.parse(group, undefined as any);
				expect(parseMapSpy).not.toHaveBeenCalled();
			});

			it('should call parseMap with provided group arg', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const json = {};
				const group = new StrongMap();
				instance.parse(group, json);
				expect(parseMapSpy).toHaveBeenCalledWith(group, expect.anything(), expect.anything());
				expect(parseMapSpy).toHaveBeenCalledTimes(1);
			});

			it('should call parseMap with provided json arg', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const json = {a: 'aaaa', b: '130991'};
				const group = new StrongMap();
				instance.parse(group, json);
				expect(parseMapSpy).toHaveBeenCalledWith(expect.anything(), json, expect.anything());
				expect(parseMapSpy).toHaveBeenCalledTimes(1);
			});

			it('should call parseMap with a new state object', () => {
				expect(parseMapSpy).not.toHaveBeenCalled();
				const json = {c1: 'cnd_014981', d81: 'abw_01094'};
				const group = new StrongMap();
				instance.parse(group, json);
				expect(parseMapSpy).toHaveBeenCalledWith(
					expect.anything(),
					expect.anything(),
					expect.anything()
				);
				expect(parseMapSpy).toHaveBeenCalledTimes(1);
			});
		});

		describe('parseMap', () => {
			it('should not throw when node arg is missing', () => {
				expect(() => {
					instance.parseMap(undefined as any, {} as any, state);
					instance.parseMap(null as any, {} as any, state);
				}).not.toThrow();
			});

			it('should not throw when json arg is missing', () => {
				expect(() => {
					const map = new StrongMap();
					instance.parseMap(map, undefined as any, state);
				}).not.toThrow();
			});

			it('should parse group with children on node', () => {
				const expectedValue = 44120;
				const json = {
					groupOne: {
						key_one_one: expectedValue
					}
				};

				const node = new SampleMap();
				instance.parseMap(node, json, state);
				expect(node.groupOne.key_one_one()).toEqual(expectedValue);
			});

			it('should parse multiple groups which each have a single key', () => {
				const expectedValue1 = 881723;
				const expectedValue2 = true;
				const expectedValue3 = '@@@ string value here';

				const json = {
					group_one: {
						key_one: expectedValue1
					},
					group_two: {
						key_two: expectedValue2
					},
					group_three: {
						key_three: expectedValue3
					}
				};

				const node = new SampleMap();
				node.groupOne.key_one_one(expectedValue1);
				node.groupTwo.key_two_two(expectedValue2);

				node.groupThree.key_three_three(expectedValue3);

				instance.parseMap(node, json, state);

				expect(node.groupOne.key_one_one()).toEqual(expectedValue1);
				expect(node.groupTwo.key_two_two()).toEqual(expectedValue2);
				expect(node.groupThree.key_three_three()).toEqual(expectedValue3);
			});

			it('should parse multiple groups which have each have multiple keys', () => {
				const expectedValue1_1 = 881723;
				const expectedValue1_2 = 'str here 1144';
				const expectedValue1_3 = 'str str str 44111';

				const expectedValue2_1 = true;
				const expectedValue2_2 = false;
				const expectedValue2_3 = false;

				const expectedValue3_1 = '@@@ string value here';
				const expectedValue3_2 = 'another str here 11411';
				const expectedValue3_3 = 'str here 22222';

				const json = {
					group_one: {
						key_one_one: expectedValue1_1,
						key_one_two: expectedValue1_2,
						key_one_three: expectedValue1_3
					},
					group_two: {
						key_two_one: expectedValue2_1,
						key_two_two: expectedValue2_2,
						key_two_three: expectedValue2_3
					},
					group_three: {
						key_three_one: expectedValue3_1,
						key_three_two: expectedValue3_2,
						key_three_three: expectedValue3_3
					}
				};

				const node = new SampleMap();
				node.groupOne.key_one_one(expectedValue1_1);
				node.groupOne.key_one_two(expectedValue1_2);
				node.groupOne.key_one_three(expectedValue1_3);

				node.groupTwo.key_two_one(expectedValue2_1);
				node.groupTwo.key_two_two(expectedValue2_2);
				node.groupTwo.key_two_three(expectedValue2_3);

				node.groupThree.key_three_one(expectedValue3_1);
				node.groupThree.key_three_two(expectedValue3_2);
				node.groupThree.key_three_three(expectedValue3_3);

				instance.parseMap(node, json, state);

				expect(node.groupOne.key_one_one()).toEqual(expectedValue1_1);
				expect(node.groupOne.key_one_two()).toEqual(expectedValue1_2);
				expect(node.groupOne.key_one_three()).toEqual(expectedValue1_3);

				expect(node.groupTwo.key_two_one()).toEqual(expectedValue2_1);
				expect(node.groupTwo.key_two_two()).toEqual(expectedValue2_2);
				expect(node.groupTwo.key_two_three()).toEqual(expectedValue2_3);

				expect(node.groupThree.key_three_one()).toEqual(expectedValue3_1);
				expect(node.groupThree.key_three_two()).toEqual(expectedValue3_2);
				expect(node.groupThree.key_three_three()).toEqual(expectedValue3_3);
			});
		});

		describe('parseKey', () => {
			let state: MapParserState;

			beforeAll(() => {
				state = new MapParserState();
			});

			it(`should return false when keyName arg is undefined`, () => {
				expect(instance.parseKey(sampleMap, undefined as any, MOCK_VALUE, state)).toBe(false);
			});

			it(`should return false when keyName arg is null`, () => {
				expect(instance.parseKey(sampleMap, null as any, MOCK_VALUE, state)).toBe(false);
			});

			it(`should return false when map arg is undefined`, () => {
				expect(instance.parseKey(undefined as any, 'keyName', MOCK_VALUE, state)).toBe(false);
			});

			it(`should return false when map arg is null`, () => {
				expect(instance.parseKey(null as any, 'keyName', MOCK_VALUE, state)).toBe(false);
			});

			it(`should set key and return true when value is null`, () => {
				const map = new SampleMap();
				const keyName = '971491741AAAljha';
				const value = '__';
				map[keyName] = value;
				expect(map[keyName]).toBe(value);
				expect(instance.parseKey(map, keyName, null, state)).toBe(true);
				expect(map[keyName]).toBeNull();
			});

			it(`should not change map key and when value is undefined`, () => {
				const map = new SampleMap();
				const keyName = '10814081akVHKAha';
				const value = 'AJFH917419087_861861';
				map[keyName] = value;
				expect(map[keyName]).toBe(value);

				expect(instance.parseKey(map, keyName, undefined, state)).toBe(false);
				expect(map[keyName]).toBe(value);
			});

			it(`should return false when value is undefined`, () => {
				const map = new SampleMap();
				const keyName = 'AKL7914971_91491';

				expect(instance.parseKey(map, keyName, undefined, state)).toBe(false);
			});
		});

		describe('parseStrongKey', () => {
			it('should not throw when key arg is missing', () => {
				expect(() => {
					instance.parseStrongKey(undefined as any, MOCK_VALUE, state);
				}).not.toThrow();

				expect(() => {
					instance.parseStrongKey(null as any, MOCK_VALUE, state);
				}).not.toThrow();
			});

			it('should not throw when node arg is missing', () => {
				expect(() => {
					instance.parseMap(undefined as any, {} as any, state);
					instance.parseMap(null as any, {} as any, state);
				}).not.toThrow();
			});

			it('should not throw when key arg is not a KVP', () => {
				expect(() => {
					instance.parseStrongKey({} as any, MOCK_VALUE, state);
				}).not.toThrow();
			});
		});
	});
});
