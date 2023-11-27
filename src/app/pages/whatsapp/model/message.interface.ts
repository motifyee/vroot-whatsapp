import { IContact } from './contact.interface';

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'seen';
export type MessageStatusIcon = '' | 'pending' | 'check' | 'doubleCheck';

export type MessageType = 'template' | 'interactive';
export type SimpleMessageType =
	| 'text'
	| 'image'
	| 'video'
	| 'audio'
	| 'document';

export interface IMessageStatuses {
	sent?: number;
	delivered?: number;
	read?: number;
}

export type SimpleMessageStatus = MessageStatus | 'downloaded';
export interface ISimpleMessage {
	id: string;
	type?: SimpleMessageType;
	body?: string;
	link?: string;
	mime_type?: string;
	status?: SimpleMessageStatus;
}

export interface IButtonMessage {
	id: string;
	title: string;
}

export interface IInteractiveMessage {
	// type: MessageType | 'button'; // should always be 'button'

	header?: ISimpleMessage;
	footer?: ISimpleMessage;
	body?: ISimpleMessage;

	buttons?: IButtonMessage[];
}

export interface ITemplateMessage {
	name: string;
	namespace?: string;

	header?: ISimpleMessage;
	body?: ISimpleMessage;
	footer?: ISimpleMessage;
}

export interface IMessage {
	id: string;
	timestamp: string;
	to?: string;

	from_us?: boolean;
	contact?: IContact;
	sender?: IContact;
	context?: IMessage;

	statuses?: IMessageStatuses;

	type?: MessageType;
	text?: string;
	interactive?: IInteractiveMessage;
	template?: ITemplateMessage;

	tags?: string[];
	chat_tags?: string[];
	mentions?: string[];
}
