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
		path: 'auth',
		loadChildren: () =>
			import('./pages/auth/routes').then(m => m.AUTH_ROUTES),
	},
	{
		path: 'settings',
		loadChildren: () =>
			import('./pages/settings/routes').then(m => m.SETTINGS_ROUTES),
	},
	{
		path: 'whatsapp',
		loadChildren: () =>
			import('./pages/whatsapp/routes').then(m => m.WHATSAPP_ROUTES),
	},
	{
		path: '**',
		component: EmptyComponent,
	},
];
