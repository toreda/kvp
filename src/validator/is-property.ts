import {STRule} from '../rule/rule';
import {STRuleFn} from '../rule/fn';
import {STRuleModifiers} from '../rule/modifiers';
import {STRuleNode} from '../rule/node';
import {STRuleNodeType} from '../rule/node-type';

export type STOpIsProperty<CallerType> = (propName: string) => CallerType;

function hasProperty(curr: any, propName: string): boolean {
	if (typeof curr === 'undefined' || curr === null) {
		return false;
	}

	const prop = curr[propName];
	return typeof prop !== 'undefined';
}

export function makeHasProperty<CallerType>(
	caller: CallerType,
	rule: STRule,
	mods: STRuleModifiers
): STOpIsProperty<CallerType> {
	return (propName: string): CallerType => {
		const fn: STRuleFn<unknown> = (curr: unknown) => {
			return hasProperty(curr, propName);
		};

		const node = new STRuleNode<unknown>('IS_PROPERTY', STRuleNodeType.CMP, fn, mods.invert);
		rule.add(node);

		return caller;
	};
}
