import { AfterContentChecked, Injectable } from '@angular/core';
import { Agendamento } from '../model/agendamento';
import { AgendamentoPageModule } from '../pages/paciente/agendamento/agendamento.module';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor() { }

  getAgendamentos(): Agendamento[] {
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');

    if (!Array.isArray(agendamentos)) {
      return [];
    }

    for (let i = 0; i < agendamentos.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < agendamentos.length - i - 1; j++) {
        let antes = new Date(agendamentos[j].ano, agendamentos[j].mes, agendamentos[j].dia, Math.floor(agendamentos[j].hora / 100), agendamentos[j].hora % 100).getTime();
        let depois = new Date(agendamentos[j + 1].ano, agendamentos[j + 1].mes, agendamentos[j + 1].dia, Math.floor(agendamentos[j + 1].hora / 100), agendamentos[j + 1].hora % 100).getTime();
        if (antes > depois) {
          // Swap arr[j] and arr[j+1]
          let temp = agendamentos[j];
          agendamentos[j] = agendamentos[j + 1];
          agendamentos[j + 1] = temp;
          swapped = true;
        }
      }

      if (swapped == false)
        break;
    }

    return agendamentos;
  }

  getAgendamento(cdAgendamento: number): Agendamento {
    var agendamentos: Agendamento[] = this.getAgendamentos();

    if (!Array.isArray(agendamentos) || agendamentos.length == 0) {
      return new Agendamento;
    }

    let index = agendamentos.findIndex((a: Agendamento) => a.cdAgendamento == cdAgendamento);
    if (index == -1) {
      return new Agendamento;
    } else {
      return agendamentos[index];
    }
  }

  getAgendamentosPorPaciente(cdPaciente: number): Agendamento[] {
    let agendamentos = this.getAgendamentos();

    if (!Array.isArray(agendamentos)) {
      return [];
    }

    agendamentos = agendamentos.filter((a: Agendamento) => a.cdPaciente == cdPaciente);

    for (let i = 0; i < agendamentos.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < agendamentos.length - i - 1; j++) {
        let antes = new Date(agendamentos[j].ano, agendamentos[j].mes, agendamentos[j].dia, Math.floor(agendamentos[j].hora / 100), agendamentos[j].hora % 100).getTime();
        let depois = new Date(agendamentos[j + 1].ano, agendamentos[j + 1].mes, agendamentos[j + 1].dia, Math.floor(agendamentos[j + 1].hora / 100), agendamentos[j + 1].hora % 100).getTime();
        if (antes > depois) {
          // Swap arr[j] and arr[j+1]
          let temp = agendamentos[j];
          agendamentos[j] = agendamentos[j + 1];
          agendamentos[j + 1] = temp;
          swapped = true;
        }
      }

      if (swapped == false)
        break;
    }

    return agendamentos;
  }

  getAgendamentosPorMedico(cdMedico: number): Agendamento[] {
    let agendamentos = this.getAgendamentos();

    if (!Array.isArray(agendamentos)) {
      return [];
    }

    agendamentos = agendamentos.filter((a: Agendamento) => a.cdMedico == cdMedico) || [];

    for (let i = 0; i < agendamentos.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < agendamentos.length - i - 1; j++) {
        let antes = new Date(agendamentos[j].ano, agendamentos[j].mes, agendamentos[j].dia, Math.floor(agendamentos[j].hora / 100), agendamentos[j].hora % 100).getTime();
        let depois = new Date(agendamentos[j + 1].ano, agendamentos[j + 1].mes, agendamentos[j + 1].dia, Math.floor(agendamentos[j + 1].hora / 100), agendamentos[j + 1].hora % 100).getTime();
        if (antes > depois) {
          // Swap arr[j] and arr[j+1]
          let temp = agendamentos[j];
          agendamentos[j] = agendamentos[j + 1];
          agendamentos[j + 1] = temp;
          swapped = true;
        }
      }

      if (swapped == false)
        break;
    }

    return agendamentos;
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

  // retorna:
  //  1  --  se apagou com sucesso
  //  -1 --  se não foi possível apagar
  //  0  --  se já é tarde demais para apagar
  cancelarAgendamento(cdAgendamento: number): number {
    if (cdAgendamento == 0) {
      return -1;
    }

    let agendamento = this.getAgendamento(cdAgendamento);
    if (cdAgendamento == 0) {
      return -1;
    }

    let hoje = new Date();
    let data_agendamento = new Date(agendamento.ano, agendamento.mes - 1, agendamento.dia);

    // confere se falta menos de 7 dias para a consulta
    if (((Math.abs(hoje.getTime() - data_agendamento.getTime())) / (1000 * 60 * 60 * 24)) < 7) {
      return 0;
    }

    let agendamentos = this.getAgendamentos();
    if (!Array.isArray(agendamentos)) {
      return -1;
    }

    let index = agendamentos.findIndex((a: Agendamento) => a.cdAgendamento == cdAgendamento);
    if (index == -1) {
      return -1;
    } else {
      agendamentos.splice(index, 1);
      localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
      return 1;
    }
  }

  cancelarAgendamentoAdm(cdAgendamento: number): number {
    if (cdAgendamento == 0) {
      return -1;
    }

    let agendamento = this.getAgendamento(cdAgendamento);
    if (cdAgendamento == 0) {
      return -1;
    }

    let agendamentos = this.getAgendamentos();
    if (!Array.isArray(agendamentos)) {
      return -1;
    }

    let index = agendamentos.findIndex((a: Agendamento) => a.cdAgendamento == cdAgendamento);
    if (index == -1) {
      return -1;
    } else {
      agendamentos.splice(index, 1);
      localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
      return 1;
    }
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
