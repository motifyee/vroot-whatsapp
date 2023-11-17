import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappFriendsListComponent } from './whatsapp-friends-list.component';

describe('WhatsappFriendsListComponent', () => {
  let component: WhatsappFriendsListComponent;
  let fixture: ComponentFixture<WhatsappFriendsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatsappFriendsListComponent]
    });
    fixture = TestBed.createComponent(WhatsappFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
