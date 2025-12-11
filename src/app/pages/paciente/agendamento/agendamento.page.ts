import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Especialidade } from 'src/app/model/especialidade';
import { Medico } from 'src/app/model/medico';
import { Usuario } from 'src/app/model/usuario';
import { CalendarioService } from 'src/app/services/calendario.service';
import { MedicoService } from 'src/app/services/medico.service';
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

  medico: Medico;
  medicos: Medico[];
  selecionadoMedico: any;

  especialidade: Especialidade;
  especialidades: Especialidade[];
  selecionadoEspecialidade: any;

  constructor(private toastController: ToastController, private navController: NavController, private usuarioService: UsuarioService, private calendarioService: CalendarioService, private router: Router, private medicoService: MedicoService) {
    let data = new Date();

    this.mes = data.getMonth() + 1;
    this.mesHoje = this.mes;
    this.mesString = this.calendarioService.numeroParaMes(this.mes);

    this.ano = data.getFullYear();
    this.anoHoje = this.ano;

    this.diaHoje = data.getDate();

    this.diaInicial = this.calendarioService.diaDaSemana(1, this.mes, this.ano);

    this.numerosAntes = new Array(this.diaInicial);
    this.numeros = new Array(this.calendarioService.diasNoMes(this.mes, this.ano));

    this.medico = new Medico(new Usuario);
    this.medicos = [];
    this.selecionadoMedico = null;

    this.especialidade = new Especialidade();
    this.especialidades = [];
    this.selecionadoEspecialidade = null;

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

    this.medicos = this.medicoService.getMedicos();
    if (!Array.isArray(this.medicos)) {
      this.medicos = [];
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
    if (this.medico.cdUsuario != 0 || this.especialidade.cdEspecialidade != 0) {
      this.router.navigate(["/agendamento-dia", this.ano, this.mes, dia]);
    } else {
      this.exibirMensagem("Selecione pelo menos o médico ou a especialidade.")
    }
  }

  back() {
    this.navController.navigateBack("/inicio");
  }

  nomeMedico(cdMedico: number): string {
    let usuario = this.usuarioService.getUsuario(cdMedico);
    return usuario.nmUsuario;
  }

  onSelectMudou(event: any) {
    this.medico = this.medicoService.getMedico(event.detail.value);
  }

  clearSelectMedico() {
    this.selecionadoMedico = null;
  }

  clearSelectEspecialidade() {
    this.selecionadoEspecialidade = null;
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
