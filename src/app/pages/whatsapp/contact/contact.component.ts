import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BypassHtmlSanitizerPipe } from '@app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { UiUtilService } from '@app/core/services/ui-util/ui-util.service';

@Component({
	selector: 'app-whatsapp-contact',
	standalone: true,
	imports: [BypassHtmlSanitizerPipe],
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
})
export class WhatsappContactComponent implements OnInit {
	uiUtils = inject(UiUtilService);
	_cd = inject(ChangeDetectorRef);
	messageIcon = '';
	callIcon = '';
	calendarIcon = '';

	ngOnInit(): void {
		this.uiUtils
			.importIcons('message', 'call', 'calendar')
			.subscribe(([message, call, calendar]) => {
				this.messageIcon = message;
				this.callIcon = call;
				this.calendarIcon = calendar;

				this._cd.detectChanges();
			});
	}
}
