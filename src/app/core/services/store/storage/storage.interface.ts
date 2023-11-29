/* eslint-disable no-unused-vars */

export type StorageKey = 'user' | 'token' | 'branch' | 'company';

export interface IStorage {
	/**
	 * Retrieves a key and its value from the storage
	 * @param key storage key
	 * @param parse whether to parse the value or not
	 *
	 * @returns the value of the key;
	 * this method will return an empty string if the key doesn't exist
	 */
	get: <T>(key: StorageKey, parse: boolean) => string | T;
	/**
	 * Stores a key and its value in the storage
	 * @param key storage key
	 * @param value the value to be stored; will stringify if it's an object
	 * @returns void
	 */
	set: (key: StorageKey, value: string | object) => void;
	/**
	 * Deletes a key and its value from the storage
	 * @param key storage key
	 * @returns void
	 */
	remove: (key: StorageKey) => void;
	/**
	 * Deletes all keys and values from the storage
	 * @returns void
	 */
	clear: () => void;
}
