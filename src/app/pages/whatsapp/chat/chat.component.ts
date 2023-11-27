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
import { Message } from '../model/message';
import { MessageStatusIcon } from '../model/message.interface';

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

	@ViewChild('messagesRef') messagesRef?: ElementRef<HTMLDivElement>;

	tailOutIcon = '';
	sendIcon = '';
	menuIcon = '';

	@Input() chat?: Chat;

	constructor() {
		afterRender(() => this.scrollToBottom());
	}

	ngOnInit(): void {
		this.loadIcons();
	}

	uploadIconsNames = [
		'folder',
		'image',
		'camera',
		'video',
		'smiley',
	] as Icon[];
	statusIconsNames = ['pending', 'check', 'double-check'] as Icon[];
	private _icons = [
		'tail-out',
		'send',
		'menu',
		'message',
		...this.uploadIconsNames,
		...this.statusIconsNames,
	];
	// eslint-disable-next-line no-unused-vars
	icons = {} as { [key in Icon]: string };
	// eslint-disable-next-line no-unused-vars
	statusIcons = {} as { [key in MessageStatusIcon]: string };
	loadIcons(): void {
		this.uiUtil.importIcons(...this._icons).subscribe(_icons => {
			const icons = this._icons.reduce(
				(acc, cur, idx) => ({ ...acc, [cur]: _icons[idx] }),
				{},
				// eslint-disable-next-line no-unused-vars
			) as { [key in (typeof this._icons)[number]]: string };

			this.icons = {
				tailOut: icons['tail-out'],
				send: icons['send'],
				menu: icons['menu'],
				message: icons['message'],

				pending: icons['pending'],
				check: icons['check'],
				doubleCheck: icons['double-check'],

				camera: icons['camera'],
				folder: icons['folder'],
				image: icons['image'],
				smiley: icons['smiley'],
				video: icons['video'],
			};

			this.statusIcons = {
				'': '',
				pending: icons['pending'],
				check: icons['check'],
				doubleCheck: icons['double-check'],
			};

			this.cd.detectChanges();
		});
	}

	msgTrackByFn(_: number, msg: Message): string {
		return msg.id ?? '';
	}

	scrollToBottom(): void {
		setTimeout(() => {
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

	previousMessage(index: number): Message | undefined {
		return this.chat?.messages[index - 1];
	}
	nextMessage(index: number): Message | undefined {
		return this.chat?.messages[index + 1];
	}
}

type Icon =
	| 'tailOut'
	| 'send'
	| 'menu'
	| 'pending'
	| 'check'
	| 'doubleCheck'
	| 'message'
	| 'camera'
	| 'folder'
	| 'image'
	| 'smiley'
	| 'video';
