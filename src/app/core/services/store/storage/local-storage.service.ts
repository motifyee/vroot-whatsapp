import { Injectable } from '@angular/core';
import { IStorage, StorageKey } from './storage.interface';
import { JSONParse } from '@utils/util';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService implements IStorage {
	get = <T>(key: StorageKey, parse = false) => {
		let value: T | string = localStorage.getItem(key) ?? '';
		if (parse) value = JSONParse(value) as T;
		return value;
	};

	set = (key: StorageKey, value: string | object) => {
		if (typeof value != 'string') value = JSON.stringify(value);
		localStorage.setItem(key, value);
	};

	remove = (key: StorageKey) => localStorage.removeItem(key);

	clear = () => localStorage.clear();
}
