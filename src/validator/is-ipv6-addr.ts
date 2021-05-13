import {STRule} from '../rule/rule';
import {STRuleFn} from '../rule/fn';
import {STRuleModifiers} from '../rule/modifiers';
import {STRuleNode} from '../rule/node';
import {STRuleNodeType} from '../rule/node-type';

export type STOpIsIpv6Addr<CallerType> = () => CallerType;

export const isIpv6Addr = (current: string): boolean => {
	if (typeof current != 'string') {
		return false;
	}

	const trimmed = current.trim();

	if (!trimmed) {
		return false;
	}

	const sections = trimmed.split(':');
	const doubleColonSegment = trimmed.split('::');
	const doubleColon = '::';

	if (!sections.length) {
		return false;
	}

	if (sections.length > 8) {
		return false;
	}

	const validatedSegment = sections.every(isValidSegment);

	if (sections.length === 8 && !validatedSegment && current.includes(doubleColon)) {
		return false;
	}

	if (sections.length <= 7 && !validatedSegment && doubleColonSegment.length >= 3) {
		return false;
	}

	return true;
};

export const isValidSegment = (segment: string): boolean => {
	if (typeof segment !== 'string') {
		return false;
	}

	const hex = parseInt(segment, 16);

	if (isNaN(hex)) {
		return false;
	}
	return hex >= 0x0 && hex <= 0xffff;
};

export function makeIsIpv6Addr<CallerType>(
	caller: CallerType,
	rule: STRule,
	mods: STRuleModifiers
): STOpIsIpv6Addr<CallerType> {
	return (): CallerType => {
		const fn: STRuleFn = (curr: string): boolean => {
			return isIpv6Addr(curr);
		};

		const node = new STRuleNode('IS_IP6_ADDR', STRuleNodeType.CMP, fn, mods.invert);
		rule.add(node);

		return caller;
	};
}
