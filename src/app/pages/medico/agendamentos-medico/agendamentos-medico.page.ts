import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agendamentos-medico',
  templateUrl: './agendamentos-medico.page.html',
  styleUrls: ['./agendamentos-medico.page.scss'],
  standalone: false,
})
export class AgendamentosMedicoPage implements ViewWillEnter {
  usuarioAutenticado: Usuario;

  diaHoje: number;
  diaHojeSemana: number;
  diaHojeSemanaTexto: string;

  constructor(private navController: NavController, private usuarioService: UsuarioService, private calendarioService: CalendarioService, private router: Router) {
    let data = new Date();
    this.diaHoje = data.getDate();
    this.diaHojeSemana = this.calendarioService.diaDaSemana(this.diaHoje, data.getMonth() + 1, data.getFullYear());
    this.diaHojeSemanaTexto = this.calendarioService.numeroParaDiaDaSemana(this.diaHojeSemana);

    this.usuarioAutenticado = new Usuario();
  }

  ionViewWillEnter() {
    this.usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (this.usuarioAutenticado == null || this.usuarioAutenticado.cdUsuario == 0 || this.usuarioAutenticado.role != "med") {
      if (this.usuarioAutenticado.role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (this.usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }
  }

  definirHorarios() {
    this.router.navigate(["/definir-horarios", this.usuarioAutenticado.cdUsuario])
  }

  paraLogin() {
    this.navController.navigateBack("/login")
  }
}
