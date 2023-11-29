import { Route } from '@angular/router';
export const AUTH_ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./auth.component').then(m => m.AuthComponent),
		pathMatch: 'full',
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'login',
			},
			{
				path: 'login',
				loadComponent: () =>
					import('./login/login.component').then(
						m => m.LoginComponent,
					),
			},
			{
				path: 'register',
				loadComponent: () =>
					import('./register/register.component').then(
						m => m.RegisterComponent,
					),
			},
		],
	},
];
