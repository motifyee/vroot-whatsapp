/* eslint-disable no-unused-vars */

import { JSONParse } from '../utils/util';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IdxSignature {
	[key: string]: any;
}

export function applyProps(
	obj: IdxSignature,
	props: IdxSignature,
	exclude: IdxSignature = {},
): void {
	for (const key in props) {
		if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
		let value = props[key];

		if (key in exclude) {
			const baseClass = exclude[key];
			value = Array.isArray(value)
				? new (baseClass as typeof BaseArray<any>)(value, baseClass)
				: new (baseClass as typeof Base<any>)(value);
		}

		const t = typeof obj[key];
		if (t === 'boolean') value = !!value;
		else if (t === 'number') value = +value;
		else if (t === 'bigint') value = BigInt(value);
		else if (t === 'object') value = JSONParse(value);
		else if (t === 'symbol') value = Symbol(value);

		obj[key] = value;
	}
}

type Constructor<T> = {
	new (): T;
	init<T>(this: Constructor<T>, props: Partial<T>): T;
};

export type ByRef<T> = {
	[key in keyof Partial<T>]: typeof Base<any> | typeof BaseArray<any>;
};

export class Base<T extends Base<T> = never> {
	// IdxSignature here is for when the interface doesn't match the class
	private __props__;
	private __byRef__ = {} as ByRef<T>;
	constructor(props: Partial<T | IdxSignature>, byRef?: ByRef<T>) {
		this.__props__ = props;
		if (byRef) this.__byRef__ = byRef;
		// (async () => {
		// 	await new Promise(resolve => setTimeout(resolve, 0));
		// 	if (props) applyProps(this, props, byRef);
		// 	if (type of onInit === 'function') onInit();
		// })();
	}

	// static init(props?: IdxSignature) {
	// 	if (!props) return;
	// 	return new this(props);
	// }

	map() {
		if (!this.__props__) return;
		applyProps(this, this.__props__, this.__byRef__);
	}
}

export class BaseArray<T extends Base<T>> extends Array<Base<T>> {
	unitInitializer!: typeof Base<T>;
	constructor(items: Partial<T | IdxSignature>[], baseClass: any) {
		super();

		const cast = (e: Partial<T | IdxSignature>): Base<T> =>
			new (baseClass as typeof Base<T>)(e);
		this.push(...items.map(cast));
	}
}
