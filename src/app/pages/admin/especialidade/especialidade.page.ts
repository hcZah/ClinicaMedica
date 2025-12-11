import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Especialidade } from 'src/app/model/especialidade';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IonAlert, IonButton } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-especialidade',
  templateUrl: './especialidade.page.html',
  styleUrls: ['./especialidade.page.scss'],
  standalone: false,
})
export class EspecialidadePage implements OnInit {



  especialidade: Especialidade;

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

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private navController: NavController, private usuarioService: UsuarioService, private toastController: ToastController, private especialidadeService: EspecialidadeService) {
    this.especialidade = new Especialidade();

    this.formGroup = this.formBuilder.group({
      'nome': [this.especialidade.desc, Validators.compose([Validators.required])],
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

    let cdEspecialidade = parseInt(this.activatedRoute.snapshot.params['cdEspecialidade']);

    if (!isNaN(cdEspecialidade)) {
      this.especialidade = this.especialidadeService.getEspecialidade(cdEspecialidade);
    }

    this.formGroup.get('nome')?.setValue(this.especialidade.desc);
  }

  cadastrar() {
    this.especialidade.desc = this.formGroup.value.nome;

    var sucesso: boolean = this.especialidadeService.cadastro(this.especialidade);

    if (!sucesso) {
      this.exibirMensagem('Não foi possível cadastrar a especialidade. Tente novamente.');
      return;
    } else {
      this.exibirMensagem('Especialidade cadastrada com sucesso!');
      this.navController.navigateForward("/especialidades");
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
      this.especialidadeService.deleteEspecialidade(this.especialidade.cdEspecialidade);
      this.back();
    } else if (role == 'cancel') {
      //
    }
  }

  async back() {
    this.navController.navigateBack("/especialidades")
  }
}
