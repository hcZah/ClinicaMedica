import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinirHorariosPage } from './definir-horarios.page';

describe('DefinirHorariosPage', () => {
  let component: DefinirHorariosPage;
  let fixture: ComponentFixture<DefinirHorariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
