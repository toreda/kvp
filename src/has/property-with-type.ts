import {BaseObject} from '../base/object';
import {Rule} from '../rule';
import {RuleFn} from '../rule/fn';
import {RuleMods} from '../rule/mods';
import {RuleNode} from '../rule/node';
import {RuleNodeType} from '../rule/node/type';

export type HasPropertyWithType<CallerType> = (propName: string, typeName: string) => CallerType;

export function hasPropertyWithType(o: unknown, propName: string, typeName: string): boolean {
	if (typeof propName !== 'string' || typeName !== 'string') {
		return false;
	}

	if (typeof o === 'undefined' || o === null) {
		return false;
	}

	if (!propName.trim() || !typeName.trim()) {
		return false;
	}

	const obj = o as BaseObject;

	if (typeof obj.hasOwnProperty !== 'function' || !obj.hasOwnProperty(propName)) {
		return false;
	}

	return typeof obj[propName] === typeName;
}

export function makeHasPropertyWithType<CallerType>(
	caller: CallerType,
	rule: Rule,
	mods: RuleMods
): HasPropertyWithType<CallerType> {
	return (propName, typeName): CallerType => {
		const fn: RuleFn<unknown> = (obj: unknown): boolean => {
			return hasPropertyWithType(obj, propName, typeName);
		};

		const node = new RuleNode<unknown>('HAS_PROP_W_TYPE', RuleNodeType.CMP, fn, mods.invert);
		rule.add(node);

		return caller;
	};
}