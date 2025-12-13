import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Medico } from 'src/app/model/medico';
import { Usuario } from 'src/app/model/usuario';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import type { OverlayEventDetail } from '@ionic/core';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { Especialidade } from 'src/app/model/especialidade';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.page.scss'],
  standalone: false,
})
export class MedicoPage implements OnInit {

  usuario: Usuario;
  senhaConfirmacao: string;
  crm: string;

  formGroup: FormGroup;

  especialidade: Especialidade;
  especialidades: Especialidade[];
  especialidadesMedico: Especialidade[];

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

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private navController: NavController, private usuarioService: UsuarioService, private toastController: ToastController, private medicoService: MedicoService, private especialidadeService: EspecialidadeService) {
    this.usuario = new Usuario();
    this.senhaConfirmacao = "";
    this.crm = "";

    this.especialidade = new Especialidade();
    this.especialidades = [];
    this.especialidadesMedico = [];

    this.formGroup = this.formBuilder.group({
      'nome': [this.usuario.nmUsuario, Validators.compose([Validators.required])],
      'cpf': [this.usuario.cpf, Validators.compose([Validators.required])],
      'crm': [this.crm, Validators.compose([Validators.required])],
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
      this.crm = this.medicoService.getMedico(cdUsuario).crm;
    }

    this.formGroup.get('nome')?.setValue(this.usuario.nmUsuario);
    this.formGroup.get('cpf')?.setValue(this.usuario.cpf);
    this.formGroup.get('crm')?.setValue(this.crm);
    this.formGroup.get('email')?.setValue(this.usuario.email);
    this.formGroup.get('senha')?.setValue(this.usuario.senha);
    this.formGroup.get('senhaConfirmacao')?.setValue(this.usuario.senha);

    this.especialidadesMedico = this.especialidadeService.getEspecialidadesPorMedico(this.usuario.cdUsuario);
    this.especialidades = this.especialidadeService.getEspecialidades().filter((e: Especialidade) => !this.medicoTemEspecialidade(e));
  }

  cadastrar() {
    this.usuario.nmUsuario = this.formGroup.value.nome;
    this.usuario.cpf = this.formGroup.value.cpf;
    this.crm = this.formGroup.value.crm;
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;
    this.senhaConfirmacao = this.formGroup.value.senhaConfirmacao;

    if (this.usuario.senha != this.senhaConfirmacao) {
      this.exibirMensagem("As senhas não coincidem.");
      return;
    }

    this.usuario.role = "med";

    var sucesso: boolean = this.usuarioService.cadastro(this.usuario);

    if (!sucesso) {
      this.exibirMensagem('Não foi possível cadastrar o médico. Tente novamente.');
      return;
    } else {
      let medico = new Medico(this.usuario);
      medico.crm = this.crm;
      sucesso = this.medicoService.cadastro(medico);

      if (!sucesso) {
        this.usuarioService.deleteUsuario(this.usuario.cdUsuario);
        this.exibirMensagem('Não foi possível cadastrar o médico. Tente novamente.');
        return;
      } else {
        this.exibirMensagem('Médico cadastrado com sucesso!');
        this.navController.navigateForward("/medicos");
      }
    }
  }

  excluir(event: CustomEvent<OverlayEventDetail>) {
    let role = event.detail.role;

    if (role == 'confirm') {
      this.medicoService.deleteMedico(this.usuario.cdUsuario);
      this.usuarioService.deleteUsuario(this.usuario.cdUsuario);
      this.back();
    } else if (role == 'cancel') {
      //
    }
  }

  addEspecialidade() {
    this.medicoService.addEspecialidade(this.usuario.cdUsuario, this.especialidade.cdEspecialidade);
    this.especialidades = this.especialidadeService.getEspecialidades().filter((e: Especialidade) => !this.medicoTemEspecialidade(e));
  }

  apagarEspecialidade(cdEspecialidade: number) {
    this.medicoService.apagarEspecialidade(this.usuario.cdUsuario, cdEspecialidade);
    this.especialidades = this.especialidadeService.getEspecialidades().filter((e: Especialidade) => !this.medicoTemEspecialidade(e));
  }

  medicoTemEspecialidade(e: Especialidade): boolean {
    this.especialidadesMedico = this.especialidadeService.getEspecialidadesPorMedico(this.usuario.cdUsuario);

    let tem = false;
    for (const em of this.especialidadesMedico) {
      if (em.cdEspecialidade == e.cdEspecialidade) {
        tem = true; 
        break;
      }
    }

    return tem;
  }

  especialidadeMudou(event: any) {
    this.especialidade = this.especialidadeService.getEspecialidade(event.detail.value);
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  back() {
    this.navController.navigateBack("/medicos");
  }
}
