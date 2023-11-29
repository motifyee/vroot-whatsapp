import { Injectable, inject } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpSentEvent,
	HttpHeaderResponse,
	HttpProgressEvent,
	HttpResponse,
	HttpUserEvent,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StorageService } from '@services/store/storage/storage.service';
import { HttpService } from '@services/http/http.service';

type APILoadingStatus = 'loading' | 'loaded' | 'error';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private storage = inject(StorageService);

	// =========================================================================
	// API Loading Notification

	private http = inject(HttpService);
	private isAPILoading = this.http.isAPILoading;
	private isAPILoaded = this.http.isAPILoaded;
	private isAPIError = this.http.isAPIError;
	private API_LOADING_KEY = this.http.API_LOADING_KEY;

	private loadingAPIs = new Map<string, string>();

	/**
	 * marks the api as loading, loaded or error
	 *
	 * notifies the subscribers of `isAPILoading`, `isAPILoaded` and
	 * `isAPIError` on the http service with the `apiLoadingKey` as the
	 * grouping key to filter the notifications
	 *
	 * @param request HttpRequest
	 * @param status `loading` | `loaded` | `error`
	 */
	private setAPILoading(
		request: HttpRequest<unknown>,
		status?: APILoadingStatus,
	) {
		const url = request.url;

		if (status === 'loading') {
			const apiLoadingKey = request.headers.get(this.API_LOADING_KEY);
			request.headers.delete(this.API_LOADING_KEY);

			this.loadingAPIs.set(url, apiLoadingKey || url || '');
			this.isAPILoading.next(apiLoadingKey || url || '');
			return;
		}
		// this.loadingAPIs.delete(request.url);
		const key = this.loadingAPIs.get(url) || '';
		this.isAPILoaded.next(key);
		if (status === 'error') this.isAPIError.next(key);
	}

	// =========================================================================
	// Add Token to Request

	/**
	 * add token to the request's headers
	 * @param request HttpRequest
	 */
	private addToken(request: HttpRequest<unknown>) {
		const token = this.storage.get('token'),
			setParams = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			} as { [key: string]: string };

		if (token) setParams['Authorization'] = 'Bearer ' + token;

		return request.clone({ setParams });
	}

	// =========================================================================
	// Handle API Errors

	/**
	 * middleware to handle api errors and rethrows it
	 * @param request HttpRequest
	 */
	// !!TODO: handle error structure
	private handleError =
		(request: HttpRequest<unknown>) =>
		(
			err: { status: number; message: string },
			caught: Observable<
				| HttpSentEvent
				| HttpHeaderResponse
				| HttpProgressEvent
				| HttpResponse<unknown>
				| HttpUserEvent<unknown>
			>,
		) => {
			// if (error.status === 401) { this.router.navigate(['login']); }
			this.setAPILoading(request, 'error');

			caught.subscribe();
			return throwError(err as never);
		};

	// =========================================================================
	// Intercept Request

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		this.setAPILoading(request, 'loading');

		request = this.addToken(request);

		return next.handle(request).pipe(
			tap(() => this.setAPILoading(request)),
			catchError(this.handleError(request)),
		);
	}
}
