import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { UiUtilService } from '@app/core/services/ui-util/ui-util.service';
import { inject, OnInit } from '@angular/core';
import { BypassHtmlSanitizerPipe } from '@app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { RouterModule } from '@angular/router';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
	selector: 'app-whatsapp-contact-list',
	standalone: true,
	imports: [
		// CommonModule,
		AccordionModule,
		DialogModule,
		ButtonModule,
		BypassHtmlSanitizerPipe,
		RouterModule,
	],
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class WhatsappContactListComponent implements OnInit {
	uiUtils = inject(UiUtilService);
	_cd = inject(ChangeDetectorRef);
	searchIcon = '';
	messageIcon = '';
	callIcon = '';
	calendarIcon = '';

	ngOnInit(): void {
		this.uiUtils
			.importIcons('search', 'message', 'call', 'calendar')
			.subscribe(([search, message, call, calendar]) => {
				this.searchIcon = search;
				this.messageIcon = message;
				this.callIcon = call;
				this.calendarIcon = calendar;

				this._cd.detectChanges();
			});
	}
}
