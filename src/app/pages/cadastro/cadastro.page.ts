import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage implements OnInit {

  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  senhaConfirmacao: string;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private navController: NavController) {
    this.nome = "";
    this.sobrenome = "";
    this.cpf = "";
    this.email = "";
    this.senha = "";
    this.senhaConfirmacao = "";

    this.formGroup = this.formBuilder.group({
      'nome': [this.nome, Validators.compose([Validators.required])],
      'email': [this.email, Validators.compose([Validators.required])],
      'senha': [this.senha, Validators.compose([Validators.required])],
      'senhaConfirmacao': [this.senhaConfirmacao, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  autenticar() {
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;

    if (this.email == "adm" && this.senha == "adm") {
      this.navController.navigateForward("menu-admin")
    }
    else {
      this.navController.navigateForward("inicio")
    }
  }

}
