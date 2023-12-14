import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '@model/user';
import { StoreService } from './store.service';

@Injectable({
	providedIn: 'root',
})
export class UserStoreService {
	store = inject(StoreService);

	private _user$: Observable<User | null> | undefined;
	get user$() {
		this._user$ ??= this.store.userSubject.asObservable().pipe(
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

	set user(user: User) {
		this.store.save('user', user, true);
	}
}
// user,
