import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Paciente } from 'src/app/model/paciente';
import { Usuario } from 'src/app/model/usuario';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IonAlert, IonButton } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
  standalone: false,
})
export class PacientePage implements OnInit {

  usuario: Usuario;
  senhaConfirmacao: string;

  formGroup: FormGroup;

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
    },
  ];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private navController: NavController, private usuarioService: UsuarioService, private toastController: ToastController, private pacienteService: PacienteService) {
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
    var usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (usuarioAutenticado == null || usuarioAutenticado.cdUsuario == 0 || usuarioAutenticado.role != "adm") {
      if (usuarioAutenticado.role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }

    let cdUsuario = parseInt(this.activatedRoute.snapshot.params['cdUsuario']);

    if (!isNaN(cdUsuario)) {
      this.usuario = this.usuarioService.getUsuario(cdUsuario);
    }

    this.formGroup.get('nome')?.setValue(this.usuario.nmUsuario);
    this.formGroup.get('cpf')?.setValue(this.usuario.cpf);
    this.formGroup.get('email')?.setValue(this.usuario.email);
    this.formGroup.get('senha')?.setValue(this.usuario.senha);
    this.formGroup.get('senhaConfirmacao')?.setValue(this.usuario.senha);
  }

  cadastrar() {
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
      this.exibirMensagem('Não foi possível cadastrar o paciente. Tente novamente.');
      return;
    } else {
      let paciente = new Paciente(this.usuario);
      sucesso = this.pacienteService.cadastro(paciente);

      if (!sucesso) {
        this.usuarioService.deleteUsuario(this.usuario.cdUsuario);
        this.exibirMensagem('Não foi possível cadastrar o paciente. Tente novamente.');
        return;
      } else {
        this.exibirMensagem('Paciente cadastrado com sucesso!');
        this.navController.navigateForward("/pacientes");
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

  excluir(event: CustomEvent<OverlayEventDetail>) {
    let role = event.detail.role;

    if (role == 'confirm') {
      this.pacienteService.deletePaciente(this.usuario.cdUsuario);
      this.usuarioService.deleteUsuario(this.usuario.cdUsuario);
      this.back();
    } else if (role == 'cancel') {
      //
    }
  }

  async back() {
    this.navController.navigateBack("/pacientes")
  }

}
