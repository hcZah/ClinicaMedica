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
    this.usuario = new Usuario();
    this.senhaConfirmacao = "";

    this.formGroup = this.formBuilder.group({
      'nome': [this.usuario.nome, Validators.compose([Validators.required])],
      'cpf': [this.usuario.cpf, Validators.compose([Validators.required])],
      'email': [this.usuario.email, Validators.compose([Validators.required])],
      'senha': [this.usuario.senha, Validators.compose([Validators.required])],
      'senhaConfirmacao': [this.senhaConfirmacao, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  cadastrar() {
    this.usuario.nome = this.formGroup.value.nome;
    this.usuario.cpf = this.formGroup.value.cpf;
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;
    this.senhaConfirmacao = this.formGroup.value.senhaConfirmacao;


    // Espera a Promise do enviar() 
    let usuarioCadastrado = new Usuario();
    this.usuarioService.cadastro(this.usuario).subscribe({
      next(usuario: Usuario) {
        usuarioCadastrado = usuario;
      },
      error(erro) {
        console.error('Erro ao cadastrar:', erro);
        super.exibirMensagem('Não foi possível cadastrar o usuário. Tente novamente.');
      }
    });

    if (usuarioCadastrado.cd = "") {
      return;
    }

    this.usuarioService.registrarUsuario(this.usuarioService.autenticar(usuarioCadastrado.email, this.formGroup.value.senha))
    let paciente = new Paciente(usuarioCadastrado);
    
    this.pacienteService.cadastro(paciente).subscribe({
      next(value) {
        super.exibirMensagem('Registro salvo com sucesso!!!');
      },
      error(erro) {
        console.error('Erro ao cadastrar:', erro);
        super.exibirMensagem('Não foi possível cadastrar o paciente. Contate a equipe de suporte.');
      }
    });
    this.navController.navigateForward("inicio")


    return; // sai do método


  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
