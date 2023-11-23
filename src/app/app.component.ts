import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { WhatsappComponent } from './pages/whatsapp/whatsapp.component';

import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: { class: 'dark' },
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [
		NgSwitch,
		NgSwitchDefault,
		NgSwitchCase,
		RouterOutlet,
		WhatsappComponent,
		CommonModule,
	],
	providers: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'v-root';
}
