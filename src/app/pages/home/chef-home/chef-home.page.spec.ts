import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChefHomePage } from './chef-home.page';

describe('ChefHomePage', () => {
  let component: ChefHomePage;
  let fixture: ComponentFixture<ChefHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
