import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientHomePage } from './client-home.page';

describe('ClientHomePage', () => {
  let component: ClientHomePage;
  let fixture: ComponentFixture<ClientHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
