/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { StorageKey } from './storage/storage.interface';
import { User } from '@model/user';
import { StorageService } from './storage/storage.service';
import { Subject } from 'rxjs';
import { Base } from '@app/core/model/base';
import { Branch } from '@app/core/model/branch';
import { Company } from '@app/core/model/company';

@Injectable({
	providedIn: 'root',
})
export class StoreService {
	storage = inject(StorageService);

	userSubject = new Subject<User | Base | null>();
	branchSubject = new Subject<Branch | Base | null>();
	companySubject = new Subject<Company | Base | null>();
	tokenSubject = new Subject<string | null>();

	constructor() {
		this.loadStorageData();
	}

	save(key: StorageKey, data: Base | string, emit = true) {
		this.storage.set('user', data);

		if (!emit) return;

		switch (key) {
			case 'user':
				return this.userSubject.next(data as User);
			case 'branch':
				return this.branchSubject.next(data as Branch);
			case 'company':
				return this.companySubject.next(data as Company);
			case 'token':
				return this.tokenSubject.next(data as string);
		}
	}

	load(
		key: StorageKey,
		base?: typeof Base | typeof String | typeof Number,
		obs?: Subject<any>,
	) {
		const value = this.storage.get(key, !!base);

		if (!obs) return value;
		if (!base) return obs.next(value);

		obs.next(new base(value));
		return value;
	}

	loadStorageData() {
		const keys: StorageTypes = {
			user: [User, this.userSubject],
			branch: [Branch, this.branchSubject],
			company: [Company, this.companySubject],
			token: [String, this.tokenSubject],
		};

		Object.entries(keys).forEach(([key, [base, obs]]) => {
			this.load(key as StorageKey, base, obs);
		});
	}
}

type StorageTypes = {
	[key in StorageKey]: [
		typeof Base | typeof String | typeof Number,
		Subject<any>,
	];
};
