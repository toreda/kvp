import {KVPOpIsEmpty, createIsEmpty} from '../../src/validator/empty';

import {KVPRule} from '../../src/rule/rule';
import {KVPRuleModifiers} from '../../src/rule/modifiers';

describe('empty', () => {
	let mods: KVPRuleModifiers;

	beforeAll(() => {
		mods = {
			invert: false
		};
	});

	beforeEach(() => {
		mods.invert = false;
	});

	describe('Usage', () => {
		it('should return true when input is a non-empty string and mods.invert is true', () => {
			const rule = new KVPRule();
			const value = 'aaaaaaaaa';
			mods.invert = true;
			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(true);
		});

		it('should return false when input is an empty array and mods.invert is true', () => {
			const rule = new KVPRule();
			const value = [];
			mods.invert = true;
			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a non-empty string', () => {
			const rule = new KVPRule();
			const value = 'aaaaaaaaa';

			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a boolean (false)', () => {
			const rule = new KVPRule();
			const value = false;

			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a boolean (true)', () => {
			const rule = new KVPRule();
			const value = true;

			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return false when input is a number', () => {
			const rule = new KVPRule();
			const value = 101;

			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(false);
		});

		it('should return true when input is an empty array', () => {
			const rule = new KVPRule();
			const value = [];

			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(true);
		});

		it('should return false when input is a non-empty arrya', () => {
			const rule = new KVPRule();
			const value = ['a', 'b', 'c'];

			const fn = createIsEmpty<KVPRule>(rule, rule, mods);
			fn(value);
			expect(rule.nodes[0].execute(value)).toBe(false);
		});
	});
});
