/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2021 Toreda, Inc.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:

 * 	The above copyright notice and this permission notice shall be included in all
 * 	copies or substantial portions of the Software.
 *
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * 	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * 	SOFTWARE.
 *
 */

import Big from 'big.js';
import {BigArg} from '../../big/arg';
import {bigMake} from '../../big/make';
import {typeMatch} from '../../type/match';

/**
 * Convert from common numeric types to the `Big` data type.
 * @param value
 * @returns
 *
 * @category Strong Helpers
 */
export function toDblBig(value?: BigArg | null): Big | null {
	if (value === undefined || value === null) {
		return null;
	}

	// No conversion needed if type is already a Big.
	if (typeMatch(value, Big)) {
		return value;
	}

	if (typeof value === 'string') {
		return bigMake(value);
	}

	// All other accepted types have been processed. If type is not number,
	// value type cannot be handled.
	if (typeof value !== 'number') {
		return null;
	}

	if (isNaN(value) || value >= Number.POSITIVE_INFINITY || value <= Number.NEGATIVE_INFINITY) {
		return null;
	}

	if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
		return null;
	}

	return bigMake(value);
}