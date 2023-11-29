/* eslint-disable no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { HttpService, RequestOptions } from '../http.service';
import { StorageService } from '@services/store/storage/storage.service';
import { tap } from 'rxjs';
import { IUserSettings, IUserActions, ILoginInfo } from '@model/user.interface';
import { User } from '@app/core/model/user';
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

	login = (email: string, pwd: string, opt: RequestOptions) => {
		return this.post<ILoginInfo>('api/login', { email, pwd }, {}, opt).pipe(
			tap(res => {
				this.storage.set('token', res.token);
			}),
		);
	};

	logout = (opt: RequestOptions) => {
		return this.get('api/logout', {}, opt).pipe(
			tap(() => this.storage.clear()),
		);
	};

	register = (email: string, pwd: string, opt: RequestOptions) =>
		this.post<ILoginInfo>('api/register', { email, pwd }, {}, opt).pipe(
			tap(res => {
				this.storage.set('token', res.token);
			}),
		);

	getUser = (opt: RequestOptions) => this.get('api/user', {}, opt);

	updateUser = (user: User, opt: RequestOptions) =>
		this.put('api/user', user, {}, opt);

	deleteUser = (opt: RequestOptions) => this.delete('api/user', {}, opt);

	getUserSettings = (opt: RequestOptions) =>
		this.get<IUserSettings>(`api/user/settings`, {}, opt);

	updateUserSettings = (settings: IUserSettings, opt: RequestOptions) =>
		this.put('api/user/settings', settings, {}, opt);
}
