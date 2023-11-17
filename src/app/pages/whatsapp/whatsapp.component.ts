import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { WhatsappChatComponent } from '../whatsapp/whatsapp-chat/whatsapp-chat.component';
import { WhatsappFriendsListComponent } from '../whatsapp/whatsapp-friends-list/whatsapp-friends-list.component';

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
