import {StrongDouble, makeDouble} from '../../src/types/double';

const MOCK_INITIAL = 5246576;
const MOCK_FALLBACK_DEFAULT = 6.5;
const MOCK_FALLBACK = -9.596596;

describe('StrongDouble', () => {
	describe('Implementation', () => {
		it('should set value to initialValue argument', () => {
			const sampleInitial = 5.785216;
			const result = makeDouble(MOCK_FALLBACK_DEFAULT, sampleInitial);
			expect(result()).toBe(sampleInitial);
		});

		it('should return fallback default when value is null', () => {
			const sampleFallback = 999981;
			const result = makeDouble(sampleFallback, null);
			expect(result()).toBe(sampleFallback);
		});

		it('should return fallback default when value is undefined', () => {
			const sampleFallback = 5.664546634;
			const result = makeDouble(sampleFallback, undefined);
			expect(result()).toBe(sampleFallback);
		});

		it('should set value when called with non-null value', () => {
			const sampleValue = 14.81;
			const result = makeDouble(MOCK_INITIAL, null);
			result(sampleValue);
			expect(result()).toBe(sampleValue);
		});

		it('should set value when called with a negative value', () => {
			const sampleValue = -15566;
			const result = makeDouble(MOCK_FALLBACK, null);
			result(sampleValue);
			expect(result()).toBe(sampleValue);
		});

		it('should set value when called with a negative decimal value', () => {
			const sampleValue = -1.855555551;
			const result = makeDouble(MOCK_FALLBACK_DEFAULT, null);
			result(sampleValue);
			expect(result()).toBe(sampleValue);
		});

		it('should set value when called with a positive value', () => {
			const sampleValue = 85646466526;
			const result = makeDouble(MOCK_INITIAL, null);
			result(sampleValue);
			expect(result()).toBe(sampleValue);
		});

		it('should set value when called with a positive decimal value', () => {
			const sampleValue = 7.454561616;
			const result = makeDouble(MOCK_FALLBACK_DEFAULT, null);
			result(sampleValue);
			expect(result()).toBe(sampleValue);
		});

		it('should set value when called with a 0 value', () => {
			const sampleValue = 0;
			const result = makeDouble(MOCK_FALLBACK, null);
			result(sampleValue);
			expect(result()).toBe(sampleValue);
		});

		it('should not set value when called with an array', () => {
			const sampleFallbackDefault = 3900001;
			const arrayValue = [546151] as any;
			const result = makeDouble(sampleFallbackDefault, null);
			result(arrayValue);
			expect(result()).toBe(sampleFallbackDefault);
		});

		it('should not set value when called with a boolean', () => {
			const sampleFallbackDefault = -4512.25565;
			const booleanValue = false as any;
			const result = makeDouble(sampleFallbackDefault, null);
			result(booleanValue);
			expect(result()).toBe(sampleFallbackDefault);
		});

		it('should not set value when called with a string', () => {
			const sampleFallbackDefault = 3.55551;
			const stringValue = '6' as any;
			const result = makeDouble(sampleFallbackDefault, null);
			result(stringValue);
			expect(result()).toBe(sampleFallbackDefault);
		});
	});

	describe('Methods', () => {
		describe('get', () => {
			it('should return fallback argument when value is null', () => {
				const sampleFallback = 8810992;
				const result = makeDouble(MOCK_FALLBACK_DEFAULT, null);
				expect(result.get(sampleFallback)).toBe(sampleFallback);
			});

			it('should return value when value is set', () => {
				const sampleInitial = -31.01;
				const result = makeDouble(MOCK_FALLBACK_DEFAULT, sampleInitial);
				expect(result.get(MOCK_FALLBACK)).toBe(sampleInitial);
			});
		});
	});
});
