import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoClientesPage } from './listado-clientes.page';

describe('ListadoClientesPage', () => {
  let component: ListadoClientesPage;
  let fixture: ComponentFixture<ListadoClientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
