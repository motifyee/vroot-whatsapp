import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { UiUtilService } from 'src/app/core/services/ui-util/ui-util.service';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { WhatsappStateService } from '../services/state/state.service';

@Component({
	selector: 'app-whatsapp-header',
	standalone: true,
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [BypassHtmlSanitizerPipe],
})
export class WhatsappHeaderComponent implements OnInit {
	uiUtil = inject(UiUtilService);
	cd = inject(ChangeDetectorRef);
	state = inject(WhatsappStateService);

	menuIcon = '';
	ngOnInit() {
		console.log(this.state.test);

		this.uiUtil.importIcon('menu').subscribe(menu => {
			this.menuIcon = menu;
			this.cd.detectChanges();
		});
	}
}
