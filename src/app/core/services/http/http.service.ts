import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, filter } from 'rxjs';
import { IdxSignature } from '@model/base';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	http = inject(HttpClient);

	// =========================================================================
	// API Loading Notification

	public readonly API_LOADING_KEY = 'api-loading-key';

	private _filterObs(keys: string[], obs: Observable<string>) {
		if (!keys.length) return obs;
		return obs.pipe(filter(k => (keys as string[]).includes(k)));
	}

	isAPIError = new Subject<string>();
	private _isAPIError: Observable<string> | undefined;
	public isAPIError$(...keys: string[]) {
		this._isAPIError ??= this.isAPIError.asObservable();
		return this._filterObs(keys, this._isAPIError);
	}

	isAPILoading = new Subject<string>();
	private _isAPILoading: Observable<string> | undefined;
	public isAPILoading$(keys: string[]) {
		this._isAPILoading ??= this.isAPILoading.asObservable();
		return this._filterObs(keys, this._isAPILoading);
	}

	isAPILoaded = new Subject<string>();
	private _isAPILoaded: Observable<string> | undefined;
	public isAPILoaded$(keys: string[]) {
		this._isAPILoaded ??= this.isAPILoaded.asObservable();
		return this._filterObs(keys, this._isAPILoaded);
	}

	// =========================================================================
	// API Requests

	private applyOptions(headers: IdxSignature, options: IdxSignature) {
		const { apiLoadingKey } = options;
		if (apiLoadingKey) headers[this.API_LOADING_KEY] = apiLoadingKey;
		return headers;
	}

	get<T>(
		url: string,
		headers = {} as IdxSignature,
		opt: RequestOptions = {},
	) {
		headers = this.applyOptions(headers, opt);
		return this.http.get<T>(url, { headers });
	}

	post<T>(
		url: string,
		body = {} as IdxSignature,
		headers = {},
		opt: RequestOptions = {},
	) {
		headers = this.applyOptions(headers, opt);
		return this.http.post<T>(url, body, { headers });
	}

	put<T>(
		url: string,
		body = {} as IdxSignature,
		headers = {},
		opt: RequestOptions = {},
	) {
		headers = this.applyOptions(headers, opt);
		return this.http.put<T>(url, body, { headers });
	}

	delete<T>(
		url: string,
		headers = {} as IdxSignature,
		opt: RequestOptions = {},
	) {
		headers = this.applyOptions(headers, opt);
		return this.http.delete<T>(url, { headers });
	}
}

/**
 *
 * @param apiLoadingKey a string to identify the api request to receive loading
 * notifications. If not provided, the url will be used as the key instead.
 */
export type RequestOptions = {
	apiLoadingKey?: string;
};
