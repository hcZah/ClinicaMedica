import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  login: string;
  senha: string;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private navController: NavController) {
    this.login = "";
    this.senha = "";

    this.formGroup = this.formBuilder.group({
      'login': [this.login, Validators.compose([Validators.required])],
      'senha': [this.senha, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  autenticar() {
    this.login = this.formGroup.value.login;
    this.senha = this.formGroup.value.senha;

    if (this.login == "adm" && this.senha == "adm") {
      this.navController.navigateForward("menu-admin")
    }
    else {
      this.navController.navigateForward("inicio")
    }
  }

}
