import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterEmployePage } from './register-employe.page';

describe('RegisterEmployePage', () => {
  let component: RegisterEmployePage;
  let fixture: ComponentFixture<RegisterEmployePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEmployePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
