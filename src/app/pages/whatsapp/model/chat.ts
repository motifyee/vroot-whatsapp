import { Message, Messages } from './message';
import { IChat } from './chat.interface';
import { Base } from './base';

class _Chat extends Base<IChat> implements IChat {
	id = '';
	name = '';
	image = '';
	lastMessage?: Message;
	messages = [] as Message[];
}

export class Chat extends _Chat {
	constructor(chat: Partial<Chat | IChat>) {
		const byRef = {
				lastMessage: Message,
				messages: Messages,
			},
			onInit = () => {
				if (!this.lastMessage) {
					this.lastMessage = this.messages[this.messages.length - 1];
				}
			};

		super(chat, byRef, onInit);
	}
}

// export const chat = (chat: IChat) => new Chat(chat);
// export const chatList = (chats: IChat[]) => chats.map(chat);
