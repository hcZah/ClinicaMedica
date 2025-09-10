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

  email: string;
  senha: string;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private navController: NavController) {
    this.email = "";
    this.senha = "";

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
      this.navController.navigateForward("menu-admin")
    }
    else {
      this.navController.navigateForward("inicio")
    }
  }

}
