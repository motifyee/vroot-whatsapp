import {
	ChangeDetectorRef,
	Component,
	HostListener,
	OnInit,
	ViewChild,
	ViewEncapsulation,
	inject,
} from '@angular/core';

import { WhatsappChatComponent } from '../whatsapp/chat/chat.component';
import { WhatsappFriendsListComponent } from '../whatsapp/friends-list/friends-list.component';
import { WhatsappMenuComponent } from '../whatsapp/menu/menu.component';
import { WhatsappContactComponent } from '../whatsapp/contact/contact.component';
import { WhatsappContactListComponent } from '../whatsapp/contact-list/contact-list.component';
import { chat } from './model/chat';
import { messageList, IMessage, Message, message } from './model/message';
import { messages } from './data/messages';
import { RouterOutlet } from '@angular/router';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';

@Component({
	selector: 'app-whatsapp',
	standalone: true,
	imports: [
		RouterOutlet,
		BypassHtmlSanitizerPipe,
		WhatsappChatComponent,
		WhatsappFriendsListComponent,
		WhatsappMenuComponent,
		WhatsappContactComponent,
		WhatsappContactListComponent,
	],
	templateUrl: './whatsapp.component.html',
	styleUrls: ['./whatsapp.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class WhatsappComponent implements OnInit {
	cd = inject(ChangeDetectorRef);
	private _messages = messages as IMessage[];
	messages = messageList(this._messages);
	chat = chat({
		id: '342',
		name: 'chad',
		image: '',
		messages: this.messages,
	});

	@ViewChild(WhatsappChatComponent) chatComponent?: WhatsappChatComponent;

	ngOnInit(): void {
		// setInterval(() => {}, 1000);
		console.log('this.chatComponent', this.chatComponent);
	}

	addMessage() {
		const idx = Math.floor(Math.random() * messages.length || 1 - 1),
			msg: Message = message(this.messages[idx]);

		msg.id = this.messages.length.toString();
		this.messages.push(msg);
		this.cd.detectChanges();
	}
	@HostListener('window:keydown.a', ['$event'])
	onKeydownHandler() {
		this.addMessage();
	}
}
