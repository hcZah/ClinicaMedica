import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

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

  constructor(private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController, private pacienteService: PacienteService) {
    this.email = "";
    this.senha = "";
    this.paciente = new Paciente();

    this.formGroup = this.formBuilder.group({
      'email': [this.email, Validators.compose([Validators.required])],
      'senha': [this.senha, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  autenticar() {
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;
    if (this.email == "adm" && this.senha == "adm") {
      this.navController.navigateForward("menu-admin");
    }

    if (this.pacienteService.auth(this.email, this.senha) != -1) {
      this.navController.navigateForward("inicio");
    } else {
      this.exibirMensagem("Email ou senha incorreto(s).");
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
