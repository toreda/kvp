import {STOpIsHexColorCode, createIsHexColorCode} from './is-hex-color-code';

import {STRule} from '../../rule/rule';
import {STRuleModifiers} from '../../rule/modifiers';

export class STValidatorPattern {
	public readonly hexColor: STOpIsHexColorCode<STValidatorPattern>;

	constructor(rule: STRule, mods: STRuleModifiers) {
		this.hexColor = createIsHexColorCode(this, rule, mods);
	}
}
