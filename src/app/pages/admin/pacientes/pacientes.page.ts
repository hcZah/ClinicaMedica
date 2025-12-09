import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Paciente } from 'src/app/model/paciente';
import { Usuario } from 'src/app/model/usuario';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
  standalone: false,
})
export class PacientesPage implements ViewWillEnter {
  pacientes: Paciente[];
  pacientesExpostos: Paciente[];
  usuarios: Usuario[];

  constructor(private pacienteService: PacienteService, private usuarioService: UsuarioService, private navController: NavController) {
    this.pacientes = [];
    this.pacientesExpostos = [];
    this.usuarios = [];
    this.load();
  }

  ionViewWillEnter() {
    var usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (usuarioAutenticado == null || usuarioAutenticado.cdUsuario == 0 || usuarioAutenticado.role != "adm") {
      if (usuarioAutenticado.role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }

    this.pacientes = this.pacienteService.getPacientes();
    if (!Array.isArray(this.pacientes)) {
      this.pacientes = [];
    }

    this.pacientesExpostos = this.pacientes;

    this.load()
  }

  load() {
    this.usuarios = [];
    this.pacientesExpostos.forEach((p: Paciente) => {
      this.usuarios.push(this.usuarioService.getUsuario(p.cdUsuario));
    });
  }

  pesquisar(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.pacientesExpostos = this.pacientes.filter((p: Paciente) => this.usuarioService.getUsuario(p.cdUsuario).nmUsuario.includes(query) || this.usuarioService.getUsuario(p.cdUsuario).cpf.includes(query));
    this.load();
  }

  back() {
    this.navController.navigateBack("/menu-admin");
  }
}
