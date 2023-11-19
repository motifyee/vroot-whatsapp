import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatComponent } from './whatsapp-chat.component';
import { BypassHtmlSanitizerPipe } from 'src/app/core/pipes/bypass-html-sanitizer/bypass-html-sanitizer.pipe';

describe('WhatsappChatComponent', () => {
	let component: WhatsappChatComponent;
	let fixture: ComponentFixture<WhatsappChatComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [WhatsappChatComponent, BypassHtmlSanitizerPipe],
		}),
			(fixture = TestBed.createComponent(WhatsappChatComponent));
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
