import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaitreHomePage } from './maitre-home.page';

describe('MaitreHomePage', () => {
  let component: MaitreHomePage;
  let fixture: ComponentFixture<MaitreHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaitreHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
