import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoginResponse } from 'src/app/model/login-response';

import { Paciente } from 'src/app/model/paciente';
import { Usuario } from 'src/app/model/usuario';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;
  paciente: Paciente;

  formGroup: FormGroup;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController, private pacienteService: PacienteService) {
    this.email = "";
    this.senha = "";
    this.paciente = new Paciente(new Usuario());

    this.formGroup = this.formBuilder.group({
      'email': [this.email, Validators.compose([Validators.required])],
      'senha': [this.senha, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.formGroup.get("email")?.setValue("");
    this.formGroup.get("senha")?.setValue("");
  }

  autenticar() {
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;
    if (this.email == "adm" && this.senha == "adm") {
      this.navController.navigateForward("menu-admin");
    }

    let loginResponse = this.usuarioService.autenticar(this.email, this.senha);

    if (loginResponse.token == "") {
      this.exibirMensagem("Email ou senha incorreto(s).");
    } else {
      let tipo = this.usuarioService.getTipoUsuario(loginResponse.usuario);

      if (tipo = "paciente") {
        this.navController.navigateForward("/inicio");
      }
      if (tipo = "medico") {
        //
      }
      if (tipo = "admin") {
        this.navController.navigateForward("/menu-admin");
      }
      this.exibirMensagem("Não foi possível realizar login.");
    }
  }

  paraCadastro() {
    this.navController.navigateForward("/cadastro");
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
