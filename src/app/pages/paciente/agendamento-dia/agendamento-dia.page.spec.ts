import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentoDiaPage } from './agendamento-dia.page';

describe('AgendamentoDiaPage', () => {
  let component: AgendamentoDiaPage;
  let fixture: ComponentFixture<AgendamentoDiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoDiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
