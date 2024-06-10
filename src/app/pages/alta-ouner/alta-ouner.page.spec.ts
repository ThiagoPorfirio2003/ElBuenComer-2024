import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaOunerPage } from './alta-ouner.page';

describe('AltaOunerPage', () => {
  let component: AltaOunerPage;
  let fixture: ComponentFixture<AltaOunerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaOunerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
