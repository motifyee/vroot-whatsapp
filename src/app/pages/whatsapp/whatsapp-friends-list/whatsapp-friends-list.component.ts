import { Component } from '@angular/core';
import { WhatsappHeaderComponent } from '../whatsapp-header/whatsapp-header.component';

@Component({
	standalone: true,
	selector: 'app-whatsapp-friends-list',
	templateUrl: './whatsapp-friends-list.component.html',
	styleUrls: ['./whatsapp-friends-list.component.scss'],
	imports: [WhatsappHeaderComponent],
})
export class WhatsappFriendsListComponent {}
