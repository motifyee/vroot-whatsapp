import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

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

	importIcons(...iconNames: string[]) {
		const icons = iconNames.map(iconName => this.importIcon(iconName));
		return forkJoin(icons);
	}
}
