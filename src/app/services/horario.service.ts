import { Injectable } from '@angular/core';
import { min } from 'rxjs';
import { Horario } from '../model/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor() { }

  getHorarios(): string[] {
    return [
      "07:00", "07:30",
      "08:00", "08:30",
      "09:00", "09:30",
      "10:00", "10:30",
      "11:00", "11:30",
      "12:00", "12:30",
      "13:00", "13:30",
      "14:00", "14:30",
      "15:00", "15:30",
      "16:00", "16:30",
      "17:00", "17:30",
      "18:00", "18:30",
      "19:00", "19:30"
    ];
  }

  cadastro(horario: Horario): boolean {
      if (horario.cdHorario == 0) {
        console.log("invalido");
        return false;
      }
      var horarios: Horario[] = this.getHorarios();
  
      if (!Array.isArray(horarios)) {
        horarios = [];
      }
  
      let index = horarios.findIndex((h: Horario) => h.cdHorario == horario.cdHorario);
      if (index == -1) {
        horarios.push(horario);
        localStorage.setItem('medicos', JSON.stringify(horarios));
        return true;
      } else {
        horarios[index] = horario;
        localStorage.setItem('medicos', JSON.stringify(horarios));
        return true;
      }
    }

  stringParaNumero(s: string): number {
    let horario_string = s.split(":", 2);
    let horario_number = [parseInt(horario_string[0]), parseInt(horario_string[1])];

    if (horario_number[0] < 0 || horario_number[0] > 23 || horario_number[1] < 0 || horario_number[1] > 60) {
      return -1;
    } else {
      return (horario_number[0] * 100) + horario_number[1];
    }
  }

  numeroParaString(horario: number): string {
    let horas: number = Math.floor(horario / 100);
    let minutos: number = horario % 100;

    if (horas < 0 || horas > 23 || minutos < 0 || minutos > 60) {
      return "Horário inválido.";
    } else {
      let minutos_str: string = `${minutos}`;
      let horas_str: string = `${horas}`;

      if (minutos < 10) {
        minutos_str = "0" + minutos_str;
      }
      if (horas < 10) {
        horas_str = "0" + horas_str;
      }

      return horas_str + ":" + minutos_str;
    }
  }

  getHorariosDisponiveisPorMedico(ano: number, mes: number, dia: number) {

  }
}
