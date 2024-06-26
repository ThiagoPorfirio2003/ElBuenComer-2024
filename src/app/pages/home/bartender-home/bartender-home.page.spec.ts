import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BartenderHomePage } from './bartender-home.page';

describe('BartenderHomePage', () => {
  let component: BartenderHomePage;
  let fixture: ComponentFixture<BartenderHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BartenderHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
