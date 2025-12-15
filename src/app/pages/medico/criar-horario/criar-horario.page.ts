import { Component, OnInit } from '@angular/core';import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Horario } from 'src/app/model/horario';
import type { OverlayEventDetail } from '@ionic/core';
import { HorarioService } from 'src/app/services/horario.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-criar-horario',
  templateUrl: './criar-horario.page.html',
  styleUrls: ['./criar-horario.page.scss'],
  standalone: false,
})
export class CriarHorarioPage implements OnInit {
  horario: Horario;

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

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private navController: NavController, private horarioService: HorarioService, private toastController: ToastController, private usuarioService: UsuarioService) {
    this.horario = new Horario();

    this.formGroup = this.formBuilder.group({
      'horarioInicio': [this.horario.horarioInicio, Validators.compose([Validators.required])],
      'horarioFim': [this.horario.horarioFim, Validators.compose([Validators.required])],
      'diaSemana': [this.horario.diaSemana, Validators.compose([Validators.required])],
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

    this.formGroup.get('horarioInicio')?.setValue(this.horario.horarioInicio);
    this.formGroup.get('horarioFim')?.setValue(this.horario.horarioFim);
    this.formGroup.get('diaSemana')?.setValue(this.horario.diaSemana);
  }

  cadastrar() {
    this.horario.horarioInicio = this.formGroup.value.horarioInicio;
    this.horario.horarioFim = this.formGroup.value.horarioFim;
    this.horario.diaSemana = this.formGroup.value.diaSemana;

    var sucesso: boolean = this.horarioService.cadastro(this.horario);

    if (!sucesso) {
      this.exibirMensagem('Não foi possível criar o horário. Tente novamente.');
      return;
    } else {
      this.exibirMensagem('Horário criado com sucesso!');
      this.navController.navigateForward("/definir-horarios");
    }
  }


  excluir(event: CustomEvent<OverlayEventDetail>) {
    let role = event.detail.role;

    if (role == 'confirm') {
      this.horarioService.deleteHorario(this.horario.cdHorario);
      
      this.back();
    } else if (role == 'cancel') {
      //
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  back() {
    this.navController.navigateBack("/definir-horarios");
  }
}