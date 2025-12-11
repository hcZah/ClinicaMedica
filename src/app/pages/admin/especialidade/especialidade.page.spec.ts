import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadePage } from './especialidade.page';

describe('EspecialidadePage', () => {
  let component: EspecialidadePage;
  let fixture: ComponentFixture<EspecialidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
