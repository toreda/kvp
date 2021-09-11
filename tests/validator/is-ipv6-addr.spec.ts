import {Rule} from '../../src/rule';
import {RuleMods} from '../../src/rule/mods';
import {makeIsIpv6Addr} from '../../src/is/ipv6-addr';

describe('IsIpv6Addr', () => {
	let mods: RuleMods;

	beforeAll(() => {
		mods = {
			invert: false
		};
	});

	describe('Usage', () => {
		describe('valid input', () => {
			it('should return true for full valid ipv6 address', () => {
				const rule = new Rule();
				const currentValue = '74dc:a100:007a:34Hd:0043:ab32:0000:ffff';

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(true);
			});

			it('should return true for valid ipv6 address containing one double colon', () => {
				const rule = new Rule();
				const currentValue = '74dc:a100:007a::02ba';

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(true);
			});
		});

		describe('invalid inputs', () => {
			it('should return false for ipv6 address containing one double colon', () => {
				const rule = new Rule();
				const currentValue = '74dc:a100:007A::34hd:0043:ab32:0000:ffff';

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should return false for ipv6 address containing more than one double colon', () => {
				const rule = new Rule();
				const currentValue = '74dc::a100::02ba';

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should reject Ipv6 address array input', () => {
				const rule = new Rule();
				const currentValue = ['74dc:a100::02ba'] as any;

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should reject empty array input', () => {
				const rule = new Rule();
				const currentValue = [] as any;

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should reject empty object input', () => {
				const rule = new Rule();
				const currentValue = {} as any;

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should reject undefined input', () => {
				const rule = new Rule();
				const currentValue = undefined as any;

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should reject null input', () => {
				const rule = new Rule();
				const currentValue = null as any;

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});

			it('should reject boolean input', () => {
				const rule = new Rule();
				const currentValue = false as any;

				const fn = makeIsIpv6Addr<Rule>(rule, rule, mods);
				fn();
				expect(rule.nodes[0].execute(currentValue)).toBe(false);
			});
		});
	});
});
