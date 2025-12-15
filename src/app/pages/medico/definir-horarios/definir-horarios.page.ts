import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Medico } from 'src/app/model/medico';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-definir-horarios',
  templateUrl: './definir-horarios.page.html',
  styleUrls: ['./definir-horarios.page.scss'],
  standalone: false,
})
export class DefinirHorariosPage implements ViewWillEnter {

  usuario_medico: Usuario;

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private navController: NavController) { 
    this.usuario_medico = new Usuario();
  }

  ionViewWillEnter() {
    this.usuario_medico = this.usuarioService.getUsuario(parseInt(this.activatedRoute.snapshot.params['cdMedico']));

    if (this.usuario_medico.cdUsuario == 0) {
      this.navController.back();
    }

    let usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (usuarioAutenticado == null || usuarioAutenticado.cdUsuario == 0 || usuarioAutenticado.role != "med") {
      if (usuarioAutenticado.role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (usuarioAutenticado.role == "med") {
        if (this.usuario_medico.cdUsuario != usuarioAutenticado.cdUsuario) {
          this.router.navigate(["/definir-horarios", usuarioAutenticado.cdUsuario]);
        }
      } else {
        this.navController.navigateBack("/login");
      }
    }
  }


  back() {
    this.navController.navigateBack("/agendamentos-medico");
  }
}
