import {Rule} from '../../src/rule';
import {RuleMods} from '../../src/rule/mods';
import {makeIsLength} from '../../src/is/length';

describe('IsUndefined', () => {
	let mods: RuleMods;

	beforeAll(() => {
		mods = {
			invert: false
		};
	});

	describe('Usage', () => {
		describe('string input', () => {
			it('should return false when expected length is 1 and current value is an empty string', () => {
				const rule = new Rule();
				const currentValue = '';
				const expectedLength = 1;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should return false when expected length is 0 and current value is an empty string', () => {
				const rule = new Rule();
				const currentValue = '';
				const expectedLength = 0;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(true);
			});
		});

		describe('array input', () => {
			it('should return true when expected length is 0 and current value is an empty array', () => {
				const rule = new Rule();
				const currentValue: string[] = [];
				const expectedLength = 0;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(true);
			});

			it('should return true when expected length is 0 and current value is an array with 1 element', () => {
				const rule = new Rule();
				const currentValue: string[] = ['a'];
				const expectedLength = 1;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(true);
			});

			it('should return true when expected length matches number of array elements', () => {
				const rule = new Rule();
				const currentValue = [11, 50982, 11092, 11092];
				const expectedLength = 4;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(true);
			});

			it('should return false when current value is undefined', () => {
				const rule = new Rule();
				const currentValue = undefined as any;
				const expectedLength = 0;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should return false when current value is null', () => {
				const rule = new Rule();
				const currentValue = null as any;
				const expectedLength = 0;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});
		});

		describe('number input', () => {
			it('should return false when expected length is 0 and current value is 1', () => {
				const rule = new Rule();
				const currentValue = 1;
				const expectedLength = 0;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should return true when expected length and current value are 1', () => {
				const rule = new Rule();
				const currentValue = 1;
				const expectedLength = 1;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(true);
			});

			it('should return false when current value is greater than expected length', () => {
				const rule = new Rule();
				const currentValue = 105;
				const expectedLength = 10;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should return false when current value is less than expected length', () => {
				const rule = new Rule();
				const currentValue = 77;
				const expectedLength = 120;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});
		});

		describe('unsupported inputs', () => {
			it('should return false when current value is a boolean (true)', () => {
				const rule = new Rule();
				const currentValue = true as any;
				const expectedLength = 1;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should return false when current value is a boolean (false)', () => {
				const rule = new Rule();
				const currentValue = false as any;
				const expectedLength = 0;

				const fn = makeIsLength<Rule>(rule, rule, mods);
				fn(expectedLength);
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});
		});
	});
});
