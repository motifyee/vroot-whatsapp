import { Base, BaseArray } from './base';
import { Contact } from './contact';
import {
	IMessage,
	IMessageStatuses,
	ISimpleMessage,
	IButtonMessage,
	IInteractiveMessage,
	ITemplateMessage,
	SimpleMessageType,
	SimpleMessageStatus,
	MessageStatus,
	MessageStatusIcon,
	MessageType,
} from './message.interface';

export class MessageStatuses
	extends Base<MessageStatuses>
	implements IMessageStatuses
{
	sent?: number;
	delivered?: number;
	read?: number;

	constructor(statuses: IMessageStatuses) {
		super(statuses);
		this.map();
	}
}

export class SimpleMessage
	extends Base<SimpleMessage>
	implements ISimpleMessage
{
	id = '';
	type?: SimpleMessageType;
	body?: string;
	link?: string;
	mime_type?: string;
	status?: SimpleMessageStatus;

	constructor(msg: ISimpleMessage) {
		super(msg);
		this.map();
	}
}

export class ButtonMessage
	extends Base<ButtonMessage>
	implements IButtonMessage
{
	id = '';
	title = '';

	constructor(msg: IButtonMessage) {
		super(msg);
		this.map();
	}
}

export class InteractiveMessage
	extends Base<InteractiveMessage>
	implements IInteractiveMessage
{
	// type: MessageType | 'button'; // should always be 'button'

	header?: SimpleMessage;
	footer?: SimpleMessage;
	body?: SimpleMessage;

	buttons?: ButtonMessage[];

	constructor(msg: IInteractiveMessage) {
		super(msg, {
			header: SimpleMessage,
			footer: SimpleMessage,
			body: SimpleMessage,
			buttons: ButtonMessage,
		});
		this.map();
	}
}

export class TemplateMessage
	extends Base<TemplateMessage>
	implements ITemplateMessage
{
	name = '';
	namespace?: string;

	header?: SimpleMessage;
	body?: SimpleMessage;
	footer?: SimpleMessage;

	constructor(msg: ITemplateMessage) {
		super(msg, {
			header: SimpleMessage,
			body: SimpleMessage,
			footer: SimpleMessage,
		});
		this.map();
	}
}

export class Message extends Base<Message> implements IMessage {
	id = '';
	timestamp = '';
	to?: string;

	from_us?: boolean;
	contact?: Contact;
	sender?: Contact;
	context?: Message;

	statuses?: MessageStatuses;

	type?: MessageType;
	text?: string;
	interactive?: InteractiveMessage;
	template?: TemplateMessage;

	tags?: string[];
	chat_tags?: string[];
	mentions?: string[];

	status?: MessageStatus;
	get statusIcon(): MessageStatusIcon {
		switch (this.status) {
			case 'pending':
				return 'pending';
			case 'sent':
				return 'check';
			case 'delivered':
				return 'doubleCheck';
			case 'seen':
				return 'doubleCheck';
		}
		return '';
	}

	get statusColor(): string {
		if (this.status === 'seen') return 'purple';
		return 'gray';
	}

	constructor(msg: Partial<Message>) {
		super(msg, {
			contact: Contact,
			sender: Contact,
			statuses: MessageStatuses,
			interactive: InteractiveMessage,
			template: TemplateMessage,
		});
		this.map();
	}
}

export class Messages extends BaseArray<Message> {
	override unitInitializer = Message;
	constructor(messages: Partial<Message | IMessage>[]) {
		super(messages, Message);
	}
}

// export const messageStatuses = (statuses: IMessageStatuses) =>
// 	new MessageStatuses(statuses);
// export const simpleMessage = (msg: ISimpleMessage) => new SimpleMessage(msg);
// export const buttonMessage = (msg: IButtonMessage) => new ButtonMessage(msg);
// export const interactiveMessage = (msg: IInteractiveMessage) =>
// 	new InteractiveMessage(msg);
// export const templateMessage = (msg: ITemplateMessage) =>
// 	new TemplateMessage(msg);

// export const message = (message: IMessage) => new Message(message);
// export const messageList = (messages: IMessage[]) => messages.map(message);
