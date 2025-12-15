import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentosAdminPage } from './agendamentos-admin.page';

describe('AgendamentosAdminPage', () => {
  let component: AgendamentosAdminPage;
  let fixture: ComponentFixture<AgendamentosAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
