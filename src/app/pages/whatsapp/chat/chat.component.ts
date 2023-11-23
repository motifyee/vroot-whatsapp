// Path: src/app/pages/whatsapp/whatsapp-chat/whatsapp-chat.component.ts

import { NgFor } from '@angular/common';
import {
	Component,
	OnInit,
	ChangeDetectorRef,
	Input,
	inject,
	ViewChild,
	ElementRef,
	afterRender,
} from '@angular/core';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';
import { UiUtilService } from 'src/app/core/services/ui-util/ui-util.service';
import { WhatsappHeaderComponent } from '../header/header.component';
import { Chat } from '../model/chat';
import { WhatsappMessageComponent } from '../message/message.component';
import { Message, MessageStatusIcon } from '../model/message';

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
		NgFor,
		WhatsappHeaderComponent,
		WhatsappMessageComponent,
	],
})
export class WhatsappChatComponent implements OnInit {
	uiUtil = inject(UiUtilService);
	cd = inject(ChangeDetectorRef);

	@ViewChild('messages') messagesRef?: ElementRef<HTMLDivElement>;

	tailOutIcon = '';
	sendIcon = '';
	menuIcon = '';

	msgIcons = {} as {
		// eslint-disable-next-line no-unused-vars
		[key in MessageStatusIcon]: string;
	};

	@Input() chat?: Chat;

	constructor() {
		afterRender(() => this.scrollToBottom());
	}

	ngOnInit(): void {
		this.loadIcons();
	}

	loadIcons(): void {
		this.uiUtil
			.importIcons(
				'tail-out',
				'send',
				'menu',
				'pending',
				'check',
				'double-check',
			)
			.subscribe(([tailOut, send, menu, pending, check, doubleCheck]) => {
				this.tailOutIcon = tailOut;
				this.sendIcon = send;
				this.menuIcon = menu;

				this.msgIcons = {
					'': '',
					pending,
					check,
					'double-check': doubleCheck,
				};

				this.cd.detectChanges();
			});
	}

	msgTrackByFn(_: number, msg: Message): string {
		return msg.id;
	}

	scrollToBottom(): void {
		setTimeout(() => {
			// const el = document.querySelector('app-whatsapp-chat .messages');
			const el = this.messagesRef?.nativeElement;
			el?.scrollTo({
				behavior: 'smooth',
				top: el.scrollHeight,
			});

			console.log(
				'scrollToBottom',
				el?.scrollHeight,
				el?.scrollTop,
				el?.clientHeight,
			);
		}, 30);
	}
}
