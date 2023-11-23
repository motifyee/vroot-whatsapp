export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'seen';
export type MessageStatusIcon = '' | 'pending' | 'check' | 'double-check';

export interface IMessage {
	id: string;
	text: string;
	time: string;
	status?: MessageStatus;
}

export class Message implements IMessage {
	id: string;
	text: string;
	time: string;
	status?: MessageStatus;

	get statusIcon(): MessageStatusIcon {
		switch (this.status) {
			case 'pending':
				return 'pending';
			case 'sent':
				return 'check';
			case 'delivered':
				return 'double-check';
			case 'seen':
				return 'double-check';
		}
		return '';
	}

	get statusColor(): string {
		if (this.status === 'seen') return 'purple';
		return 'gray';
	}

	constructor({ id, text, time, status }: IMessage) {
		this.id = id;
		this.text = text;
		this.time = time;
		this.status = status;
	}
}
export const message = (message: IMessage) => new Message(message);
export const messageList = (messages: IMessage[]) => messages.map(message);
