import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserData } from '@model/user.interface';
import { StorageService } from './storage/storage.service';
import { UserData } from '@model/user';

@Injectable({
	providedIn: 'root',
})
export class UserStoreService {
	storage = inject(StorageService);

	private userSubject = new BehaviorSubject<IUserData | null>(null);
	private _user$: Observable<IUserData | null> | undefined;
	get user$() {
		this._user$ ??= this.userSubject.asObservable().pipe(
			tap(user => {
				// should redirect to login page if user is null
				if (!user)
					console.warn(
						'User is null\nShould redirect to login page!!',
					);
			}),
		);

		return this._user$;
	}

	loadUserData() {
		const userData = this.storage.get<IUserData>('user', true) as IUserData;
		if (userData) this.userSubject.next(new UserData(userData));
	}

	constructor() {
		this.loadUserData();
	}
}
