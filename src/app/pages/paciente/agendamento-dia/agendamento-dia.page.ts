import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agendamento-dia',
  templateUrl: './agendamento-dia.page.html',
  styleUrls: ['./agendamento-dia.page.scss'],
  standalone: false,
})
export class AgendamentoDiaPage implements ViewWillEnter {
  diaHoje: number;
  mesHoje: number;
  mesHojeTexto: string;
  anoHoje: number;

  constructor(private navController: NavController, private usuarioService: UsuarioService, private calendarioService: CalendarioService, private activatedRoute: ActivatedRoute) {
    this.diaHoje = 0;
    this.mesHoje = 0;
    this.mesHojeTexto = ""
    this.anoHoje = 0;
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

    this.anoHoje = parseInt(this.activatedRoute.snapshot.params['ano']);
    if (this.anoHoje == undefined) {
      this.navController.navigateBack("/agendamento");
    }

    this.mesHoje = parseInt(this.activatedRoute.snapshot.params['mes']);
    if (this.mesHoje == undefined) {
      this.navController.navigateBack("/agendamento");
    }
    this.mesHojeTexto = this.calendarioService.numeroParaMes(this.mesHoje);

    this.diaHoje = parseInt(this.activatedRoute.snapshot.params['dia']);
    if (this.diaHoje == undefined) {
      this.navController.navigateBack("/agendamento");
    }
  }

  back() {
    this.navController.navigateBack("/agendamento");
  }
}
