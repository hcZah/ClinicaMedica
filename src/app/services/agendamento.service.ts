import { Injectable } from '@angular/core';
import { Agendamento } from '../model/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor() { }

  getAgendamentos(): Agendamento[] {
    return JSON.parse(localStorage.getItem('usuarios') || '{}');
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

  private agendamentoValido(agendamento: Agendamento): boolean {
    let agendamentos: Agendamento[] = this.getAgendamentos();

    if (!Array.isArray(agendamentos)) {
      console.log("valido");
      return true;
    }

    let teste: Agendamento | undefined = agendamentos.find((a: Agendamento) => (a.cdAgendamento != agendamento.cdAgendamento));

    if (teste != undefined) {
      console.log("invalido");
      return false;
    }

    console.log("valido");
    return true;
  }
}
