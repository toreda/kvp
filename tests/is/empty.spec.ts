import {IsEmpty, makeIsEmpty} from '../../src/is/empty';

import {Rule} from '../../src/rule';
import {RuleMods} from '../../src/rule/mods';

const EMPTY_ARRAY: string[] = [];

describe('IsEmpty', () => {
	let rule: Rule;
	let fn: IsEmpty<Rule>;
	let mods: RuleMods;

	beforeAll(() => {
		mods = {
			invert: false
		};

		rule = new Rule();
		fn = makeIsEmpty<Rule>(rule, rule, mods);
		fn('aaaa');
	});

	describe('Usage', () => {
		it('should return true when input is a non-empty string and mods.invert is true', () => {
			const customRule = new Rule();
			const customFn = makeIsEmpty<Rule>(customRule, customRule, {invert: true});
			const value = 'aaaaaaaaa';
			customFn(value);
			expect(customRule.nodes[0].execute(value)).toBe(true);
		});

		it('should return false when input is an empty array and mods.invert is true', () => {
			const customRule = new Rule();
			const value: string[] = [];
			const customFn = makeIsEmpty<Rule>(customRule, customRule, {invert: true});
			customFn('');
			expect(customRule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a non-empty string', () => {
			const value = 'aaaaaaaaa';

			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a boolean (false)', () => {
			const value = false;

			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a boolean (true)', () => {
			const value = true;

			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a number', () => {
			const value = 101;

			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return true when input is an empty array', () => {
			const customFn = makeIsEmpty<Rule>(rule, rule, {invert: false});
			customFn(EMPTY_ARRAY);
			expect(rule.nodes[0].execute(EMPTY_ARRAY)).toBe(true);
		});

		it('should return false when input is a non-empty array', () => {
			const value: string[] = ['a', 'b', 'c'];
			expect(rule.nodes[0].execute(value)).toBe(false);
		});
	});
});