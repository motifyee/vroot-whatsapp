/* eslint-disable no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { HttpService } from '../http.service';
import { StorageService } from '@services/store/local-storage.service';
import { tap } from 'rxjs';
import {
	IUserSettings,
	IUserLoginData,
	IUserActions,
	ILoginInfo,
} from '@model/user.interface';
/**
 * @description
 * stores:
 * - user data
 * - user state
 * - user actions
 * - user permissions
 * - user settings
 * - user preferences
 */

@Injectable({
	providedIn: 'root',
})
export class UserService implements IUserActions {
	storage = inject(StorageService);
	http = inject(HttpService);
	get = this.http.get;
	post = this.http.post;
	put = this.http.put;
	delete = this.http.delete;

	login = (email: string, pwd: string) => {
		return this.post<ILoginInfo>('api/login', { email, pwd }).pipe(
			tap(res => {
				this.storage.set('token', res.token);
			}),
		);
	};

	logout = () => {
		return this.get('api/logout').pipe(tap(() => this.storage.clear()));
	};

	register = (email: string, pwd: string) =>
		this.post<ILoginInfo>('api/register', { email, pwd }).pipe(
			tap(res => {
				this.storage.set('token', res.token);
			}),
		);

	getUser = () => this.get('api/user');

	updateUser = (user: IUserLoginData) => this.put('api/user', user);

	deleteUser = () => this.delete('api/user');

	getUserSettings = () => this.get<IUserSettings>(`api/user/settings`);

	updateUserSettings = (settings: IUserSettings) =>
		this.put('api/user/settings', settings);
}
