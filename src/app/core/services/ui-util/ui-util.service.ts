import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable()
export class UiUtilService {
	// eslint-disable-next-line no-unused-vars
	constructor(private http: HttpService) {}

	// eslint-disable-next-line no-unused-vars
	importIcon(iconName: string): Observable<string> {
		return this.http.get(`assets/icons/${iconName}.svg`, {
			responseType: 'text',
		});
	}

	importIcons(...iconNames: string[]) {
		const icons = iconNames.map(iconName => this.importIcon(iconName));
		return forkJoin(icons);
	}
}
