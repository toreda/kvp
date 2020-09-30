import {TBRule} from '../rule/rule';
import {TBRuleFn} from '../rule/fn';
import {TBRuleModifiers} from '../rule/modifiers';
import {TBRuleNode} from '../rule/node';
import {TBRuleNodeType} from '../rule/node-type';

export type TBOpIsLessThanOrEqualTo<CallerType> = (a: number) => CallerType;

export const lessThanOrEqualToFn = (curr: number, target: number): boolean => {
	if (typeof curr !== 'number' || typeof target !== 'number') {
		return false;
	}

	return curr <= target;
};

export function makeIsLessThanOrEqualTo<CallerType>(
	caller: CallerType,
	rule: TBRule,
	mods: TBRuleModifiers
): TBOpIsLessThanOrEqualTo<CallerType> {
	return (target: number): CallerType => {
		const ruleFn: TBRuleFn = (curr: number) => {
			return lessThanOrEqualToFn(curr, target);
		};

		const node = new TBRuleNode('IS_LT_OR_EQT', TBRuleNodeType.CMP, ruleFn, mods.invert);
		rule.add(node);

		return caller;
	};
}