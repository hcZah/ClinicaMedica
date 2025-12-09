import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { LoginData } from 'src/app/model/login-data';
import { Paciente } from 'src/app/model/paciente';
import { Usuario } from 'src/app/model/usuario';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage implements OnInit {

  usuario: Usuario;
  senhaConfirmacao: string;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private navController: NavController, private usuarioService: UsuarioService, private toastController: ToastController, private pacienteService: PacienteService) {
    this.usuarioService.deslogar();

    this.usuario = new Usuario();
    this.senhaConfirmacao = "";

    this.formGroup = this.formBuilder.group({
      'nome': [this.usuario.nmUsuario, Validators.compose([Validators.required])],
      'cpf': [this.usuario.cpf, Validators.compose([Validators.required])],
      'email': [this.usuario.email, Validators.compose([Validators.required])],
      'senha': [this.usuario.senha, Validators.compose([Validators.required])],
      'senhaConfirmacao': [this.senhaConfirmacao, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.usuarioService.deslogar();
  }

  cadastrar() {
    this.usuario.cdUsuario = 0;
    this.usuario.nmUsuario = this.formGroup.value.nome;
    this.usuario.cpf = this.formGroup.value.cpf;
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;
    this.senhaConfirmacao = this.formGroup.value.senhaConfirmacao;

    if (this.usuario.senha != this.senhaConfirmacao) {
      this.exibirMensagem("As senhas não coincidem.");
      return;
    }

    this.usuario.role = "pac";

    var sucesso: boolean = this.usuarioService.cadastro(this.usuario);

    if (!sucesso) {
      this.exibirMensagem('Não foi possível cadastrar o usuário. Tente novamente.');
      return;
    } else {
      let paciente = new Paciente(this.usuario);
      sucesso = this.pacienteService.cadastro(paciente);

      if (!sucesso) {
        this.usuarioService.deleteUsuario(this.usuario.cdUsuario);
        this.exibirMensagem('Não foi possível cadastrar o usuário. Tente novamente.');
        return;
      } else {
        this.exibirMensagem('Usuário cadastrado com sucesso!');
        this.navController.navigateForward("/login");
      }
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
