// Path: src/app/pages/whatsapp/whatsapp-chat/whatsapp-chat.component.ts

import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { UiUtilService } from 'src/app/core/services/ui-util/ui-util.service';
import { WhatsappHeaderComponent } from '../header/header.component';

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
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
	imports: [
		BypassHtmlSanitizerPipe,
		CommonModule,
		NgFor,
		WhatsappHeaderComponent,
	],
	providers: [UiUtilService],
})
export class WhatsappChatComponent implements OnInit {
	constructor(
		private uiUtil: UiUtilService,
		private cd: ChangeDetectorRef,
	) {}
	tailOutIcon = '';
	sendIcon = '';
	menuIcon = '';

	messages = [
		{ text: 'Hey, how are you?', time: '10:12 AM' },
		{ text: "I'm fine, how about you?", time: '10:12 AM', received: true },
		{ text: "I'm fine too, thanks", time: '10:12 AM' },
		{ text: "How's your day going?", time: '10:12 AM' },
		{ text: "It's going great!", time: '10:12 AM', received: true },
		{ text: 'What about you?', time: '10:12 AM', received: true },
		{ text: "It's going great!", time: '10:12 AM' },
		{ text: 'What about you?', time: '10:12 AM' },
		{ text: "It's going great!", time: '10:12 AM', received: true },
		{ text: 'What about you?', time: '10:12 AM', received: true },
		{ text: "It's going great!", time: '10:12 AM' },
		{ text: 'What about you?', time: '10:12 AM' },
		{ text: "It's going great!", time: '10:12 AM', received: true },
		{ text: 'What about you?', time: '10:12 AM', received: true },
	];

	ngOnInit(): void {
		this.uiUtil
			.importIcons('tail-out', 'send', 'menu')
			.subscribe(([tailOut, send, menu]) => {
				this.tailOutIcon = tailOut;
				this.sendIcon = send;
				this.menuIcon = menu;
				this.cd.detectChanges();
			});
	}
}
