import { Route } from '@angular/router';
import { UiUtilService } from '@services/ui-util/ui-util.service';

export const SETTINGS_ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./settings.component').then(
				m => m.WhatsappSettingsComponent,
			),
		providers: [UiUtilService],
	},
];
