import { Route } from '@angular/router';
import { Component } from '@angular/core';

@Component({
	selector: 'app-empty',
	standalone: true,

	template: 'empty',
})
class EmptyComponent {}

export const routes: Route[] = [
	{
		path: '',
		redirectTo: 'whatsapp',
		pathMatch: 'full',
	},
	{
		path: 'whatsapp',
		loadChildren: () =>
			import('./pages/whatsapp/whatsapp-routs').then(
				m => m.WHATSAPP_ROUTES,
			),
	},
	{
		path: '**',
		component: EmptyComponent,
	},
];
