/* eslint-disable no-unused-vars */
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

export class Base<T extends Base<T>> {
	// IdxSignature here is for when the interface doesn't match the class
	props;
	byRef = {} as ByRef<T>;
	constructor(props: Partial<T | IdxSignature>, byRef?: ByRef<T>) {
		this.props = props;
		if (byRef) this.byRef = byRef;
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

	map(props?: Partial<T | IdxSignature>, byRef?: ByRef<T>) {
		if (!this.props) return;
		applyProps(this, this.props, this.byRef);
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
