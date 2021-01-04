import {StrongDateTime, makeDateTime} from '../../src/types/dateTime';

const MOCK_INITIAL = '1886-05-30T18:45:36';
const MOCK_FALLBACK_DEFAULT = '2020-12-25';
const MOCK_FALLBACK = '2015-02';

describe('StrongDateTime', () => {
	describe('Implementation', () => {
		it('should set initial value to sampleInitial argument', () => {
			const sampleInitial = '2008-04-16T06:45:25';
			const result = makeDateTime(sampleInitial, MOCK_INITIAL);
			expect(result()).toBe(sampleInitial);
		});

		it('should not set value when called with a string', () => {
			const result = makeDateTime(null, MOCK_INITIAL);
			const sampleValue = 'Feb 5th';
			result(sampleValue);
			expect(result()).toBe(MOCK_INITIAL);
		});

		it('should not set value when called with an empty string', () => {
			const sampleFallback = '2020-08-28T21:00:52';
			const emptyString = '';
			const result = makeDateTime(null, sampleFallback);
			result(emptyString);
			expect(result()).toBe(sampleFallback);
		});

		it('should return fallback default when value is null', () => {
			const sampleFallback = '1520-06-27';
			const result = makeDateTime(null, sampleFallback);
			expect(result()).toBe(sampleFallback);
		});

		it('should return fallback default when value is undefined', () => {
			const sampleFallback = '1886-12-25';
			const result = makeDateTime(undefined, sampleFallback);
			expect(result()).toBe(sampleFallback);
		});

		it('should not set value when called with a number', () => {
			const sampleFallback = '2020';
			const numberedValue = 5 as any;
			const result = makeDateTime(null, sampleFallback);
			result(numberedValue);
			expect(result()).toBe(sampleFallback);
		});

		it('should not set value when called with a boolean value', () => {
			const sampleFallback = '2011-02-29';
			const booleanValue = false as any;
			const result = makeDateTime(null, sampleFallback);
			result(booleanValue);
			expect(result()).toBe(sampleFallback);
		});
	});

	describe('Methods', () => {
		describe('get', () => {
			it('should return fallback argument when value is null', () => {
				const sampleFallback = '2020-12-25T08:30:52';
				const string = makeDateTime(null, MOCK_FALLBACK_DEFAULT);
				expect(string.get(sampleFallback)).toBe(sampleFallback);
			});

			it('should return value when value is set', () => {
				const sampleInitial = '1995-12-01';
				const string = makeDateTime(sampleInitial, MOCK_FALLBACK_DEFAULT);
				expect(string.get(MOCK_FALLBACK)).toBe(sampleInitial);
			});
		});
	});
});
