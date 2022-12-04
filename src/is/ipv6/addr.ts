/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2022 Toreda, Inc.
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

/**
 * Type signature for isIpv6Addr validators used in rule chains.
 *
 * @category Validators
 */
export type IsIpv6Addr<CallerT> = () => CallerT;

export function isIpv6Addr(current: string): boolean {
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
}

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
