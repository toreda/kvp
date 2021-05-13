import {STRule} from '../rule/rule';
import {STRuleFn} from '../rule/fn';
import {STRuleModifiers} from '../rule/modifiers';
import {STRuleNode} from '../rule/node';
import {STRuleNodeType} from '../rule/node-type';

export type STOpHasPropertyWithType<CallerType> = (propName: string, typeName: string) => CallerType;

export function hasPropertyWithType(obj, propName, typeName): boolean {
	if (typeof propName !== 'string' || typeName !== 'string') {
		return false;
	}

	if (typeof obj === 'undefined' || obj === null) {
		return false;
	}

	if (!propName.trim() || !typeName.trim()) {
		return false;
	}

	return typeof obj[propName] === typeName;
}

export function makeHasPropertyWithType<CallerType>(
	caller: CallerType,
	rule: STRule,
	mods: STRuleModifiers
): STOpHasPropertyWithType<CallerType> {
	return (propName, typeName): CallerType => {
		const fn: STRuleFn = (obj) => {
			return hasPropertyWithType(obj, propName, typeName);
		};

		const node = new STRuleNode('HAS_PROPERTY_W_TYPE', STRuleNodeType.CMP, fn, mods.invert);
		rule.add(node);

		return caller;
	};
}
