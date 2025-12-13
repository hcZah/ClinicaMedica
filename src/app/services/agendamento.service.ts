import { AfterContentChecked, Injectable } from '@angular/core';
import { Agendamento } from '../model/agendamento';
import { AgendamentoPageModule } from '../pages/paciente/agendamento/agendamento.module';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor() { }

  getAgendamentos(): Agendamento[] {
    return JSON.parse(localStorage.getItem('agendamentos') || '{}');
  }

  getAgendamentosPorPaciente(cdPaciente: number): Agendamento[] {
    let agendamentos = this.getAgendamentos();

    if (!Array.isArray(agendamentos)) {
      return [];
    }

    return agendamentos.filter((a: Agendamento) => a.cdPaciente == cdPaciente) || [];
  }

  getAgendamentosPorMedico(cdMedico: number): Agendamento[] {
    let agendamentos = this.getAgendamentos();

    if (!Array.isArray(agendamentos)) {
      return [];
    }

    return agendamentos.filter((a: Agendamento) => a.cdMedico == cdMedico) || [];
  }

  cadastrarAgendamento(agendamento: Agendamento) {
    if (!this.agendamentoValido(agendamento)) {
      console.log("invalido");
      return false;
    }

    var agendamentos: Agendamento[] = this.getAgendamentos();

    if (!Array.isArray(agendamentos)) {
      agendamentos = [];
    }

    if (agendamento.cdAgendamento == 0) {
      agendamento.cdAgendamento = this.getValidId();
      agendamentos.push(agendamento);
    } else {
      return false;
    }

    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    return true;
  }

  private agendamentoValido(agendamento: Agendamento): boolean {
    let agendamentos: Agendamento[] = this.getAgendamentos();

    if (!Array.isArray(agendamentos)) {
      console.log("valido");
      return true;
    }

    for (let a of agendamentos) {
      if (a.cdMedico == agendamento.cdMedico && a.ano == agendamento.ano && a.mes == agendamento.mes && a.dia == agendamento.dia && a.hora == agendamento.hora) {
        return false;
      }
    }

    console.log("valido");
    return true;
  }

  private getValidId(): number {
    let agendamentos = this.getAgendamentos();
    if (!Array.isArray(agendamentos)) {
      return Math.floor(Math.random() * 10000000) + 1;
    }

    var cd: number = -1;
    let valid = false;

    while (!valid) {
      valid = true;
      cd = Math.floor(Math.random() * 10000000) + 1;
      let test = agendamentos.find((a: Agendamento) => a.cdAgendamento == cd);

      if (test != undefined) {
        valid = false;
      }
    }

    return cd;
  }
}
