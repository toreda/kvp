import {ANY, AnyObj, Expand, LiteralToPrimitive, Primitive} from '@toreda/types';

import {Strong} from '../strong';

export type PrimitiveToStrong<Literal> = Strong<LiteralToPrimitive<Literal>>;

// Do not export, this is a helper type and has unexpected results if not used correctly
type RecordToStrongRequired<Rec> = {
	[Key in keyof Rec]: Rec[Key] extends Primitive
		? PrimitiveToStrong<Rec[Key]>
		: Rec[Key] extends AnyObj<ANY>
		? Expand<RecordToStrong<Rec[Key]>>
		: Rec[Key];
};

export type RecordToStrong<Rec> = RecordToStrongRequired<Required<Rec>>;
