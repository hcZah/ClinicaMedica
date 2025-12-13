import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Agendamento } from 'src/app/model/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { HorarioService } from 'src/app/services/horario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements ViewWillEnter {
  
  agendamentos: Agendamento[];

  constructor(private horarioService: HorarioService, private usuarioService: UsuarioService, private navController: NavController, private agendamentoService: AgendamentoService) { 
    this.agendamentos = [];
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

    this.agendamentos = this.agendamentoService.getAgendamentosPorPaciente(usuarioAutenticado.cdUsuario);
  }

  formatarHora(hora: number): string {
    return this.horarioService.numeroParaString(hora);
  }

  paraLogin() {
    this.usuarioService.deslogar();
    this.navController.navigateForward("/login");
  }
}
