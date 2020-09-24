import createMatchType, {KVPOpMatchType} from './type';
import createMatchTypes, {KVPOpMatchesTypes} from './types';

import KVPRule from './rule';

export default class KVPRuleOr {
	public readonly type: KVPOpMatchType<KVPRuleOr>;
	public readonly types: KVPOpMatchesTypes<KVPRuleOr>;

	constructor(rule: KVPRule) {
		this.type = createMatchType<KVPRuleOr>(this, rule);
		this.types = createMatchTypes<KVPRuleOr>(this, rule);
	}
}
