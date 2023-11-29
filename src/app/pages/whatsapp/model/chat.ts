import { Message, Messages } from './message';
import { IChat } from './chat.interface';
import { Base, ByRef } from '@model/base';

export class Chat extends Base<Chat> implements IChat {
	id = '';
	name = '';
	image = '';
	lastMessage?: Message;
	messages = [] as Message[];

	constructor(chat: Partial<Chat | IChat>) {
		const byRef = {
			lastMessage: Message,
			messages: Messages,
		} as unknown as ByRef<Chat>;

		super(chat, byRef);
		this.map();

		if (!this.lastMessage) {
			this.lastMessage = this.messages[this.messages.length - 1];
		}
	}
}

// export const chat = (chat: IChat) => new Chat(chat);
// export const chatList = (chats: IChat[]) => chats.map(chat);
