import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappHeaderComponent } from './whatsapp-header.component';

describe('WhatsappHeaderComponent', () => {
  let component: WhatsappHeaderComponent;
  let fixture: ComponentFixture<WhatsappHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WhatsappHeaderComponent]
    });
    fixture = TestBed.createComponent(WhatsappHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
