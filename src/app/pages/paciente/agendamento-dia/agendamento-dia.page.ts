import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agendamento-dia',
  templateUrl: './agendamento-dia.page.html',
  styleUrls: ['./agendamento-dia.page.scss'],
  standalone: false,
})
export class AgendamentoDiaPage implements OnInit {

  constructor(private navController: NavController, private usuarioService: UsuarioService) { }

  ngOnInit() {
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

  back() {
    this.navController.navigateBack("/agendamento");
  }
}
