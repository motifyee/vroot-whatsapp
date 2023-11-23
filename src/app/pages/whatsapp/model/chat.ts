import { Message } from './message';

export interface IChat {
	id: string;
	name: string;
	image: string;
	lastMessage?: Message;
	messages: Message[];
}

export class Chat implements IChat {
	id: string;
	name: string;
	image: string;
	lastMessage?: Message;
	messages = [] as Message[];

	constructor({ id, name, image, lastMessage, messages }: IChat) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.lastMessage = lastMessage;
		this.messages = messages;

		if (!this.lastMessage) {
			this.lastMessage = this.messages[this.messages.length - 1];
		}
	}
}

export const chat = (chat: IChat) => new Chat(chat);
export const chatList = (chats: IChat[]) => chats.map(chat);
