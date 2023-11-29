import { Route } from '@angular/router';
import { WhatsappStateService } from './services/state/state.service';
import { UiUtilService } from 'src/app/core/services/ui-util/ui-util.service';

export const WHATSAPP_ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./whatsapp.component').then(m => m.WhatsappComponent),
		providers: [WhatsappStateService, UiUtilService],
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'contact-list',
			},
			{
				path: 'contact-list',
				loadComponent: () =>
					import('./contact-list/contact-list.component').then(
						m => m.WhatsappContactListComponent,
					),
			},
			{
				path: 'friends-list',
				loadComponent: () =>
					import('./friends-list/friends-list.component').then(
						m => m.WhatsappFriendsListComponent,
					),
			},
			{
				path: 'settings',
				loadComponent: () =>
					import('./settings/settings.component').then(
						m => m.WhatsappSettingsComponent,
					),
			},
			//  ### display ###
			{
				path: '',
				pathMatch: 'full',
				outlet: 'display',
				redirectTo: 'chat',
			},
			{
				path: 'contact',
				outlet: 'display',
				loadComponent: () =>
					import('./contact/contact.component').then(
						m => m.WhatsappContactComponent,
					),
			},
			{
				path: 'chat',
				outlet: 'display',
				loadComponent: () =>
					import('./chat/chat.component').then(
						m => m.WhatsappChatComponent,
					),
			},
			// {
			// 	path: 'chats',
			// },
			// {
			// 	path: 'calls',
			// },
			// {
			// 	path: 'calendar',
			// },
			// {
			// 	path: 'new-chat',
			// },
			// {
			// 	path: 'new-group',
			// },
		],
	},
];
