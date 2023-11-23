import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class WhatsappStateService {
	test = 'test value';
	constructor() {
		console.log('StateService.constructor()');
	}
}

/**
 * signalR connection
 * send message
 * load messages
 * load contacts
 * load groups
 * load group messages
 * load group contacts
 * load group info
 * load group settings
 *
 */
