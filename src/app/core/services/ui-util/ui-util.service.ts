import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UiUtilService {
	// eslint-disable-next-line no-unused-vars
	constructor(private http: HttpClient) {}

	// eslint-disable-next-line no-unused-vars
	importIcon(iconName: string) {
		return this.http.get(`assets/icons/${iconName}.svg`, {
			responseType: 'text',
		});
	}
}
