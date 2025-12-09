import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Medico } from 'src/app/model/medico';
import { Usuario } from 'src/app/model/usuario';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
  standalone: false,
})
export class MedicosPage implements ViewWillEnter {
  medicos: Medico[];
  medicosExpostos: Medico[];
  usuarios: Usuario[];

  constructor(private medicoService: MedicoService, private usuarioService: UsuarioService, private navController: NavController) {
    this.medicos = [];
    this.medicosExpostos = [];
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

    this.medicos = this.medicoService.getMedicos();
    if (!Array.isArray(this.medicos)) {
      this.medicos = [];
    }

    this.medicosExpostos = this.medicos;

    this.load()
  }

  load() {
    this.usuarios = [];
    this.medicosExpostos.forEach((m: Medico) => {
      this.usuarios.push(this.usuarioService.getUsuario(m.cdUsuario));
    });
  }

  pesquisar(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.medicosExpostos = this.medicos.filter((m: Medico) => m.crm.toLowerCase().includes(query) || this.usuarioService.getUsuario(m.cdUsuario).nmUsuario.includes(query) || this.usuarioService.getUsuario(m.cdUsuario).cpf.includes(query));
    this.load();
  }

  back() {
    this.navController.navigateBack("/menu-admin");
  }
}
