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
import { Chat } from './model/chat';
import { Message, Messages } from './model/message';
import { IMessage } from './model/message.interface';
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
	messages = new Messages(this._messages);

	chat = new Chat({
		id: '342',
		name: 'chad',
		image: '',
		messages: this._messages,
	});

	@ViewChild(WhatsappChatComponent) chatComponent?: WhatsappChatComponent;

	ngOnInit(): void {
		console.log('this.chat', this.chat);
		// setInterval(() => {}, 1000);
		console.log('this.chatComponent', this.chatComponent);
	}

	addMessage() {
		const idx = Math.floor(Math.random() * messages.length || 1 - 1),
			_msg = this.messages[idx],
			msg = new Message(_msg);

		msg.id = (this.messages[this.messages.length - 1] as IMessage).id;
		this.messages.push(msg);
		this.cd.detectChanges();
	}

	onOutletLoaded(
		component: WhatsappChatComponent | WhatsappContactComponent,
	) {
		if (component instanceof WhatsappChatComponent) {
			component.chat = this.chat;
		}
	}

	@HostListener('window:keydown.a')
	onKeydownHandler() {
		this.addMessage();
	}
}
