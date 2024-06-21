import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaiterHomePage } from './waiter-home.page';

describe('WaiterHomePage', () => {
  let component: WaiterHomePage;
  let fixture: ComponentFixture<WaiterHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
