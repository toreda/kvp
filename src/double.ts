import KVP, {KVPNullable, createKVP, createKVPNullable} from './kvp';

import {KVPRules} from './rules';

export type KVPDouble = KVP<number>;

export type KVPDoubleNullable = KVPNullable<number>;

export function createKVPDouble(initial: number | null, fallback: number): KVPDouble {
	const rules = new KVPRules<number>();

	rules.add().must.match.type.double();

	return createKVP<number>(initial, fallback, rules);
}

export function createKVPDoubleNullable(
	initial: number | null,
	fallback: number
): KVPDoubleNullable {
	const rules = new KVPRules();
	rules.add().must.match.type.double();

	return createKVPNullable<number>(initial, fallback, rules);
}