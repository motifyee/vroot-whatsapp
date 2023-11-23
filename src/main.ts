import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';

import { RouterModule } from '@angular/router';
bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			RouterModule,
			BrowserModule,
			BrowserAnimationsModule,
			HttpClientModule,
		),
		provideRouter(routes),
	],
}).catch(err => console.error(err));
