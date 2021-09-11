import {TransformFNNB} from '../src/transform/fn/nb';
import {TransformNB} from '../src/transform/nb';

describe('STTransformNB', () => {
	describe('Constructor', () => {
		it('should throw when fn argument is not provided', () => {
			expect(() => {
				const custom = new TransformNB<string>(undefined as any);
			}).toThrow('STTransformNB init failed - fn argument missing.');
		});

		it('should set id when provided in options argument', () => {
			const fn: TransformFNNB<string> = (value: string | null): string | null => {
				return value;
			};
			const sampleId = 'AAA_@@@@@33321__334';
			const custom = new TransformNB<string>(fn, {
				id: sampleId
			});

			expect(custom.id).toBe(sampleId);
		});
	});

	describe('Implementation', () => {
		describe('run', () => {
			it('should not throw when transform fn throws', () => {
				const fn = jest.fn();
				fn.mockImplementation(() => {
					throw new Error('woop woop');
				});

				expect(() => {
					const sampleVal = 'hello225425';
					const custom = new TransformNB<string>(fn, {});
					custom.run(sampleVal);
				}).not.toThrow();
			});

			it('should return original value argument if transform fn throws', () => {
				const fn = jest.fn();
				fn.mockImplementation(() => {
					throw new Error('woop woop');
				});
				const sampleVal = 'hi_30091';
				const custom = new TransformNB<string>(fn, {});

				expect(custom.run(sampleVal)).toBe(sampleVal);
			});

			it('should return null when transform fn returns null', () => {
				const fn = jest.fn();
				fn.mockImplementation(() => {
					return null;
				});
				const sampleVal = 'hi_223134';
				const custom = new TransformNB<string>(fn, {});

				expect(custom.run(sampleVal)).toBeNull();
			});

			it('should not throw when value argument is null', () => {
				const fn = jest.fn();
				fn.mockImplementation(() => {
					return null;
				});
				const sampleVal = 'hi_223134';
				const custom = new TransformNB<string>(fn, {});
				expect(() => {
					custom.run(null);
				}).not.toThrow();
			});

			it('should pass value argument to transform fn when value is null', () => {
				const fn = jest.fn();
				fn.mockImplementation(() => {
					return null;
				});
				const custom = new TransformNB<string>(fn, {});
				custom.run(null);
				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenCalledWith(null);
			});
		});
	});
});
