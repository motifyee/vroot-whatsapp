import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WhatsappHeaderComponent } from '../header/header.component';
import { UiUtilService } from 'src/app/core/services/ui-util/ui-util.service';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { forkJoin } from 'rxjs';

@Component({
	standalone: true,
	selector: 'app-whatsapp-friends-list',
	templateUrl: './friends-list.component.html',
	styleUrls: ['./friends-list.component.scss'],
	imports: [WhatsappHeaderComponent, BypassHtmlSanitizerPipe],
	providers: [UiUtilService],
})
export class WhatsappFriendsListComponent implements OnInit {
	searchIcon = '';
	filterIcon = '';

	constructor(
		private uiUtil: UiUtilService,
		private cd: ChangeDetectorRef,
	) {}
	ngOnInit() {
		this.uiUtil
			.importIcons('search', 'filter')
			.subscribe(([search, filter]) => {
				this.searchIcon = search;
				this.filterIcon = filter;
				this.cd.detectChanges();
			});
	}
}
