import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { UiUtilService } from '@services/ui-util/ui-util.service';
import { BypassHtmlSanitizerPipe } from '@pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-whatsapp-menu',
	standalone: true,
	imports: [BypassHtmlSanitizerPipe, NgFor, RouterLink],
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class WhatsappMenuComponent implements OnInit {
	uiUtils = inject(UiUtilService);
	_cd = inject(ChangeDetectorRef);

	// messages
	// Contacts
	// calls
	// calendar
	// record

	icons = [] as string[];
	routes = [
		'friends-list',
		'contact-list',
		'friends-list',
		'contact-list',
		'friends-list',
	];

	selectedIndex = 0;

	ngOnInit(): void {
		this.uiUtils
			.importIcons('message', 'person', 'call', 'calendar', 'record')
			.subscribe(([message, person, call, calendar, record]) => {
				this.icons = [message, person, call, calendar, record];
				this._cd.detectChanges();
			});
	}
}
