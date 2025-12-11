import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agendamentos-medico',
  templateUrl: './agendamentos-medico.page.html',
  styleUrls: ['./agendamentos-medico.page.scss'],
  standalone: false,
})
export class AgendamentosMedicoPage implements ViewWillEnter {
  diaHoje: number;
  diaHojeSemana: number;
  diaHojeSemanaTexto: string;

  constructor(private navController: NavController, private usuarioService: UsuarioService, private calendarioService: CalendarioService) {
    let data = new Date();
    this.diaHoje = data.getDate();
    this.diaHojeSemana = this.calendarioService.diaDaSemana(this.diaHoje, data.getMonth() + 1, data.getFullYear());
    this.diaHojeSemanaTexto = this.calendarioService.numeroParaDiaDaSemana(this.diaHojeSemana);
  }

  ionViewWillEnter() {
    var usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (usuarioAutenticado == null || usuarioAutenticado.cdUsuario == 0 || usuarioAutenticado.role != "med") {
      if (usuarioAutenticado.role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }
  }
}
