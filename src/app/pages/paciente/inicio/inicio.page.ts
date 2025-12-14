import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Agendamento } from 'src/app/model/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { CalendarioService } from 'src/app/services/calendario.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { HorarioService } from 'src/app/services/horario.service';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import type { OverlayEventDetail } from '@ionic/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements ViewWillEnter {
  usuarioAutenticado: Usuario;

  agendamentos: Agendamento[];

  alertaAberto: boolean[];

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
    },
  ];

  constructor(private toastController: ToastController, private calendarioService: CalendarioService, private horarioService: HorarioService, private usuarioService: UsuarioService, private navController: NavController, private agendamentoService: AgendamentoService, private medicoService: MedicoService, private especialidadeService: EspecialidadeService) {
    this.usuarioAutenticado = new Usuario();

    this.alertaAberto = [];

    this.agendamentos = [];
  }

  ionViewWillEnter() {
    var usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (usuarioAutenticado == null || usuarioAutenticado.cdUsuario == 0 || usuarioAutenticado.role != "pac") {
      if (usuarioAutenticado.role == "med") {
        //
      } else if (usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }

    this.usuarioAutenticado = usuarioAutenticado;

    this.agendamentos = this.agendamentoService.getAgendamentosPorPaciente(usuarioAutenticado.cdUsuario);

    for (let a of this.agendamentos) {
      this.alertaAberto.push(false);
    }
  }

  abrirAlerta(numAlerta: number) {
    this.alertaAberto[numAlerta] = true;
  }

  fecharAlerta(numAlerta: number) {
    this.alertaAberto[numAlerta] = false;
  }

  cancelarAgendamento(event: CustomEvent<OverlayEventDetail>, cdAgendamento: number, numAlerta: number) {
    let role = event.detail.role;

    if (role == 'confirm') {
      let resultado = this.agendamentoService.cancelarAgendamento(cdAgendamento);

      this.fecharAlerta(numAlerta);
      if (resultado == 1) {
        this.agendamentos = this.agendamentoService.getAgendamentosPorPaciente(this.usuarioAutenticado.cdUsuario);
        this.exibirMensagem("O agendamento foi cancelado.");
      } else if (resultado == 0) {
        this.exibirMensagem("Faltam menos de 7 dias para esse agendamento. Cancele-o por telefone.");
      } else if (resultado == -1) {
        this.exibirMensagem("Não foi possível cancelar agendamento. Consulte nosso atendimento.");
      }

    } else if (role == 'cancel') {
      this.fecharAlerta(numAlerta);
    }
  }

  formatarData(dia: number, mes: number, ano: number): string {
    return this.calendarioService.numerosParaData(dia, mes, ano);
  }

  formatarHora(hora: number): string {
    return this.horarioService.numeroParaString(hora);
  }

  getNomeMedico(cd: number): String {
    return this.usuarioService.getUsuario(cd).nmUsuario;
  }

  getNomeEspecialidade(cd: number): string {
    return this.especialidadeService.getEspecialidade(cd).desc;
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

  paraLogin() {
    this.usuarioService.deslogar();
    this.navController.navigateForward("/login");
  }
}
