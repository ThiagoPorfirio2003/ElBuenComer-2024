import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiningMenuPage } from './dining-menu.page';

describe('DiningMenuPage', () => {
  let component: DiningMenuPage;
  let fixture: ComponentFixture<DiningMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
