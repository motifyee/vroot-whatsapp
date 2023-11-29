import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, filter } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	http = inject(HttpClient);

	private _filterObs(
		key: string | string[] | undefined,
		obs: Observable<string>,
	) {
		if (!key) return obs;
		if (typeof key === 'string') key = [key];
		return obs.pipe(filter(k => (key as string[]).includes(k)));
	}

	isAPIError = new Subject<string>();
	private _isAPIError: Observable<string> | undefined;
	public isAPIError$(key: string | string[] | undefined) {
		this._isAPIError ??= this.isAPIError.asObservable();
		return this._filterObs(key, this._isAPIError);
	}

	isAPILoading = new Subject<string>();
	private _isAPILoading: Observable<string> | undefined;
	public isAPILoading$(key: string | string[] | undefined) {
		this._isAPILoading ??= this.isAPILoading.asObservable();
		return this._filterObs(key, this._isAPILoading);
	}

	isAPILoaded = new Subject<string>();
	private _isAPILoaded: Observable<string> | undefined;
	public isAPILoaded$(key: string | string[] | undefined) {
		this._isAPILoaded ??= this.isAPILoaded.asObservable();
		return this._filterObs(key, this._isAPILoaded);
	}

	get<T>(url: string, headers = {}) {
		return this.http.get<T>(url, { headers });
	}

	post<T>(url: string, body = {}, headers = {}) {
		return this.http.post<T>(url, body, { headers });
	}

	put<T>(url: string, body = {}, headers = {}) {
		return this.http.put<T>(url, body, { headers });
	}

	delete<T>(url: string, headers = {}) {
		return this.http.delete<T>(url, { headers });
	}
}
