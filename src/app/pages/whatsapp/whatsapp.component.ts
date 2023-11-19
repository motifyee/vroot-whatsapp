import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { WhatsappChatComponent } from '../whatsapp/chat/chat.component';
import { WhatsappFriendsListComponent } from '../whatsapp/friends-list/friends-list.component';

@Component({
	selector: 'app-whatsapp',
	standalone: true,
	imports: [
		CommonModule,
		WhatsappChatComponent,
		WhatsappFriendsListComponent,
	],
	templateUrl: './whatsapp.component.html',
	styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent {}
