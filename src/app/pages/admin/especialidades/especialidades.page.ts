import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Especialidade } from 'src/app/model/especialidade';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.page.html',
  styleUrls: ['./especialidades.page.scss'],
  standalone: false,
})
export class EspecialidadesPage implements ViewWillEnter {
  especialidades: Especialidade[];
  especialidadesExpostas: Especialidade[];

  constructor(private especialidadeService: EspecialidadeService, private usuarioService: UsuarioService, private navController: NavController) {
    this.especialidades = [];
    this.especialidadesExpostas = [];
    this.load();
  }

  ionViewWillEnter() {
    var usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (usuarioAutenticado == null || usuarioAutenticado.cdUsuario == 0 || usuarioAutenticado.role != "adm") {
      if (usuarioAutenticado.role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (usuarioAutenticado.role == "med") {
        this.navController.navigateForward("/agendamentos-medico");
      } else {
        this.navController.navigateBack("/login");
      }
    }

    this.especialidades = this.especialidadeService.getEspecialidades();
    if (!Array.isArray(this.especialidades)) {
      this.especialidades = [];
    }

    this.especialidadesExpostas = this.especialidades;

    this.load()
  }

  load() {
    //
  }

  pesquisar(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.especialidadesExpostas = this.especialidades.filter((e: Especialidade) => e.desc.includes(query));
    this.load();
  }

  back() {
    this.navController.navigateBack("/menu-admin");
  }
}
