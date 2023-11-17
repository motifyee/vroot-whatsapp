// Path: src/app/pages/whatsapp/whatsapp-chat/whatsapp-chat.component.ts

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { UiUtilService } from 'src/app/core/services/ui-util/ui-util.service';

// import { ActivatedRoute } from '@angular/router';
// import { ChatService } from 'src/app/services/chat.service';
// import { Chat } from 'src/app/models/chat.model';
// import { Message } from 'src/app/models/message.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/models/user.model';
// import { UserService } from 'src/app/services/user.service';
// import { Subscription } from 'rxjs';

@Component({
	standalone: true,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: { class: 'app-whatsapp-chat' },
	selector: 'app-whatsapp-chat',
	templateUrl: './whatsapp-chat.component.html',
	styleUrls: ['./whatsapp-chat.component.scss'],
	imports: [BypassHtmlSanitizerPipe],
	providers: [UiUtilService],
})
export class WhatsappChatComponent implements OnInit {
	constructor(
		private uiUtil: UiUtilService,
		private cd: ChangeDetectorRef,
	) {}
	tailOut = '';

	ngOnInit(): void {
		console.log('WhatsappChatComponent');

		this.uiUtil.importIcon('tail-out').subscribe(svg => {
			this.tailOut = svg;
			this.cd.detectChanges();
		});
	}
}
