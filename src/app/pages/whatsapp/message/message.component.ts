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
	@Input() tailOutIcon = '';
	@Input() statusIcons = {} as {
		// eslint-disable-next-line no-unused-vars
		[key in MessageStatusIcon]: string;
	};

	msgIcons(icon: MessageStatusIcon): string {
		if (!this.statusIcons[icon]) return '';
		return this.statusIcons[icon];
	}
}
