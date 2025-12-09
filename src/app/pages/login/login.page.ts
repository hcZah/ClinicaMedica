import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewWillEnter } from '@ionic/angular';
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
export class LoginPage implements ViewWillEnter {

  email: string;
  senha: string;
  paciente: Paciente;

  formGroup: FormGroup;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController, private pacienteService: PacienteService) {
    this.usuarioService.deslogar();
    this.email = "";
    this.senha = "";
    this.paciente = new Paciente(new Usuario());

    this.formGroup = this.formBuilder.group({
      'email': [this.email, Validators.compose([Validators.required])],
      'senha': [this.senha, Validators.compose([Validators.required])]
    });
  }

  ionViewWillEnter() {
    this.usuarioService.deslogar();
    this.formGroup.reset();
  }

  autenticar() {
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;

    let usuario: Usuario = this.usuarioService.autenticar(this.email, this.senha);

    if (usuario.cdUsuario == 0) {
      this.exibirMensagem("Email ou senha incorreto(s).");
    } else {
      let role = usuario.role;

      if (role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (role == "med") {
        //
      } else if (role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.exibirMensagem("Não foi possível realizar login.");
      }
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
