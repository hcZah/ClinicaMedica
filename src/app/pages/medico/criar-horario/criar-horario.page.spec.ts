import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarHorarioPage } from './criar-horario.page';

describe('CriarHorarioPage', () => {
  let component: CriarHorarioPage;
  let fixture: ComponentFixture<CriarHorarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarHorarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
