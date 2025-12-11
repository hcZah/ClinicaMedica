import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
  standalone: false,
})
export class AgendamentoPage implements ViewWillEnter {
  mes: number;
  mesString: string;
  ano: number;
  diaInicial: number;

  numerosAntes: number[];
  numeros: number[];

  diaHoje: number;
  mesHoje: number;
  anoHoje: number;

  constructor(private navController: NavController, private usuarioService: UsuarioService, private calendarioService: CalendarioService, private router: Router) {
    let data =  new Date();

    this.mes = data.getMonth() + 1;
    this.mesHoje = this.mes;
    this.mesString = this.calendarioService.numeroParaMes(this.mes);

    this.ano = data.getFullYear();
    this.anoHoje = this.ano;

    this.diaHoje = data.getDate();

    this.diaInicial = this.calendarioService.diaDaSemana(1, this.mes, this.ano);

    this.numerosAntes = new Array(this.diaInicial);
    this.numeros = new Array(this.calendarioService.diasNoMes(this.mes, this.ano));

    for (let i = 0; i < this.numeros.length; i++) {
      this.numeros[i] = i + 1;
    }
  }

  ionViewWillEnter() {
    var usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (usuarioAutenticado == null || usuarioAutenticado.cdUsuario == 0 || usuarioAutenticado.role != "pac") {
      if (usuarioAutenticado.role == "med") {
        //
      } else if (usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }
  }

  fimDeSemana(dia: number): boolean {
    let diaDaSemana = this.calendarioService.diaDaSemana(dia, this.mes, this.ano);
    if (diaDaSemana == 0 || diaDaSemana == 6) {
      return true;
    } else {
      return false;
    }
  }

  antesDeHoje(dia: number): boolean {
    if ((this.ano == this.anoHoje && this.mes < this.mesHoje) || this.ano < this.anoHoje || (this.anoHoje == this.ano && this.mesHoje == this.mes && dia < this.diaHoje)) {
      return true;
    } else {
      if (this.ano > this.anoHoje + 1 || (this.ano == this.anoHoje + 1 && this.mes > this.mesHoje) || (this.ano == this.anoHoje + 1 && this.mesHoje == this.mes && dia > this.diaHoje)) {
        return true;
      }
      return false;
    }
  }

  mudarMes(qnt: number) {
    if ((this.mes + qnt) > 12) {
      this.ano += 1;
      this.mes = 1;
    } else if ((this.mes + qnt) < 1) {
      this.ano -= 1;
      this.mes = 12;
    } else {
      this.mes += qnt;
    }

    this.atualizarCalendario()
  }

  atualizarCalendario() {
    this.mesString = this.calendarioService.numeroParaMes(this.mes);

    this.diaInicial = this.calendarioService.diaDaSemana(1, this.mes, this.ano);

    this.numerosAntes = new Array(this.diaInicial);
    this.numeros = new Array(this.calendarioService.diasNoMes(this.mes, this.ano));

    for (let i = 0; i < this.numeros.length; i++) {
      this.numeros[i] = i + 1;
    }
  }

  diaDisponivel(dia: number): boolean {
    return true;
  }

  irParaDia(dia: number) {
    this.router.navigate(["/agendamento-dia", this.ano, this.mes, dia]);
  }

  back() {
    this.navController.navigateBack("/inicio");
  }
}
