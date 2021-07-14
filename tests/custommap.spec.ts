import {StrongMap} from 'src/map';
import {StrongInt, makeInt} from 'src/types/int';
import {StrongArray, makeArray} from '../src/types/array';

class CustomMap extends StrongMap {
	obj1: {
		obj2: StrongInt;
	};
	obj3: StrongInt;
	obj4: CustomObj;
	obj5: any[];
	obj6: StrongArray<number>;
	obj7: CustomMapChild;
	wnd: Window;

	constructor(options?: any) {
		super();

		this.obj1 = {
			obj2: makeInt(0)
		};
		this.obj3 = makeInt(0);
		this.obj4 = new CustomObj();
		this.obj5 = [1, 2, 3];
		this.obj6 = makeArray([10, 11, 12]);
		this.obj7 = new CustomMapChild();
		this.wnd = window;

		this.parse(options);
	}
}

class CustomMapChild extends StrongMap {
	prop_1: StrongInt;
	prop_2: number;

	constructor(options?: any) {
		super();

		this.prop_1 = makeInt(0);
		this.prop_2 = 8;

		this.parse(options);
	}
}

class CustomObj {
	prop1: string = 'prop_1';
	prop2: number = 999;
}

describe('Tests', () => {
	it('1', () => {
		const custom = new CustomMap();
		const json = custom.jsonify();
		console.log(json);
	});

	it('2', () => {
		const custom = new CustomMap({
			obj1: {obj2: 4},
			obj3: 6,
			obj4: {prop1: 'wrong', prop2: NaN},
			obj5: [3, 4, 5],
			obj6: [13, 14, 15],
			obj7: {prop_1: 17, prop_2: 99},
			wnd: window
		});
		// const json = custom.jsonify();
		// console.log(json);
	});
});
