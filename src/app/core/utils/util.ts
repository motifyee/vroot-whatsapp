export function JSONParse(value: string, defaultValue?: never) {
	try {
		return JSON.parse(value);
	} catch (error) {
		if (typeof defaultValue !== 'undefined') return defaultValue;
		return value;
	}
}
