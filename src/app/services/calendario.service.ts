import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor() { }

  numeroParaMes(n: number): string {
    switch (n) {
      case 1: return "Janeiro";
      case 2: return "Fevereiro";
      case 3: return "Março";
      case 4: return "Abril";
      case 5: return "Maio";
      case 6: return "Junho";
      case 7: return "Julho";
      case 8: return "Agosto";
      case 9: return "Setembro";
      case 10: return "Outubro";
      case 11: return "Novembro";
      case 12: return "Dezembro";
      default: return "Número inválido";
    }
  }

  mesParaNumero(m: string): number {
    const mes = m.toLowerCase();

    switch (mes) {
      case "janeiro": return 1;
      case "fevereiro": return 2;
      case "março":
      case "marco": return 3; // aceita sem acento também
      case "abril": return 4;
      case "maio": return 5;
      case "junho": return 6;
      case "julho": return 7;
      case "agosto": return 8;
      case "setembro": return 9;
      case "outubro": return 10;
      case "novembro": return 11;
      case "dezembro": return 12;
      default: return -1; // indica mês inválido
    }
  }

  diaDaSemana(dia: number, mes: number, ano: number): number {
    let codAno = ((ano % 100) + (Math.floor((ano % 100) / 4))) % 7;

    let codMeses = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];

    let codSeculo = 6;
    switch (Math.floor(ano / 100)) {
      case 19:
        codSeculo = 0;
        break;
      case 20:
        codSeculo = 6;
        break;
      case 21:
        codSeculo = 4;
        break;
      case 22:
        codSeculo = 2;
        break;
    }

    let bissexto = 0;
    if (mes == 1 || mes == 2) {
      if (ano % 400 == 0 || (ano % 4 == 0 && ano % 100 != 0)) {
        bissexto = 1;
      }
    }

    return (codAno + codMeses[mes - 1] + codSeculo + dia - bissexto) % 7;
  }

  diasNoMes(mes: number, ano: number): number {
    switch (mes) {
      case 1:  // Janeiro
      case 3:  // Março
      case 5:  // Maio
      case 7:  // Julho
      case 8:  // Agosto
      case 10: // Outubro
      case 12: // Dezembro
        return 31;

      case 4:  // Abril
      case 6:  // Junho
      case 9:  // Setembro
      case 11: // Novembro
        return 30;

      case 2: {
        // Verifica bissexto:
        // Regra: ano é bissexto se:
        // - é divisível por 4 e não por 100
        // - ou é divisível por 400
        const bissexto = (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
        return bissexto ? 29 : 28;
      }

      default:
        throw new Error("Mês inválido (use 1 a 12)");
    }
  }
}
