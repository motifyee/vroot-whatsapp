import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Message, MessageStatusIcon } from '../model/message';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';

@Component({
	selector: 'app-whatsapp-message',
	standalone: true,
	imports: [BypassHtmlSanitizerPipe, NgIf],
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class WhatsappMessageComponent {
	@Input({ required: true }) message!: Message;
	@Input({ required: true }) prevMessage?: Message;
	@Input({ required: true }) nextMessage?: Message;
	@Input() tailOutIcon = '';
	@Input() statusIcons = {} as {
		// eslint-disable-next-line no-unused-vars
		[key in MessageStatusIcon]: string;
	};

	msgIcons(icon: MessageStatusIcon): string {
		if (!this.statusIcons[icon]) return '';
		return this.statusIcons[icon];
	}

	get isFirstMessage(): boolean {
		if (!this.prevMessage) return true;
		const idMatches = this.message.id === this.prevMessage.id,
			sameSide = !!this.message.status === !!this.prevMessage.status;

		return !idMatches && !sameSide;
	}

	get isLastMessage(): boolean {
		if (!this.nextMessage) return true;
		return this.message.id !== this.nextMessage.id;
	}

	get shouldShowSenderName(): boolean {
		const hasStatus = !!this.message.status;
		if (this.isFirstMessage) return !hasStatus;
		return false;
	}
}
