import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Agendamento } from 'src/app/model/agendamento';
import { Medico } from 'src/app/model/medico';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { CalendarioService } from 'src/app/services/calendario.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { HorarioService } from 'src/app/services/horario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import type { OverlayEventDetail } from '@ionic/core';
import { Usuario } from 'src/app/model/usuario';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-agendamentos-admin',
  templateUrl: './agendamentos-admin.page.html',
  styleUrls: ['./agendamentos-admin.page.scss'],
  standalone: false,
})
export class AgendamentosAdminPage implements ViewWillEnter {
  usuarioAutenticado: Usuario;

  agendamentos: Agendamento[];
  agendamentosExpostos: Agendamento[];

  query: string = '';

  estaPesquisando: number;

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

  constructor(private toastController: ToastController, private especialidadeService: EspecialidadeService, private navController: NavController, private usuarioService: UsuarioService, private agendamentoService: AgendamentoService, private calendarioService: CalendarioService, private horarioService: HorarioService, private medicoService: MedicoService) {
    this.usuarioAutenticado = new Usuario();

    this.agendamentos = [];
    this.agendamentosExpostos = [];
    this.estaPesquisando = 1;

    this.alertaAberto = [];
  }

  ionViewWillEnter() {
    this.usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (this.usuarioAutenticado == null || this.usuarioAutenticado.cdUsuario == 0 || this.usuarioAutenticado.role != "adm") {
      if (this.usuarioAutenticado.role == "pac") {
        this.navController.navigateForward("/inicio");
      } else if (this.usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }

    this.agendamentos = this.agendamentoService.getAgendamentos();
    if (!Array.isArray(this.agendamentos)) {
      this.agendamentos = [];
    }

    this.agendamentosExpostos = this.agendamentos;
    for (let a of this.agendamentos) {
      this.alertaAberto.push(false);
    }
  }

  pesquisar(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.query = target.value?.toLowerCase() || '';

    this.buscar();
  }

  mudarPesquisa(event: Event) {
    const target = event.target as HTMLInputElement;

    this.estaPesquisando = parseInt(target.value);
    this.buscar();
  }

  buscar() {
    this.agendamentosExpostos = [];

    if (this.query == '') {
      this.agendamentosExpostos = this.agendamentos;
    } else if (this.estaPesquisando == 3) {
      let data;
      let hora;
      for (let a of this.agendamentos) {
        data = this.calendarioService.numerosParaData(a.dia, a.mes, a.ano);
        hora = this.horarioService.numeroParaString(a.hora);

        if (data.includes(this.query) || hora.includes(this.query)) {
          this.agendamentosExpostos.push(a);
        }
      }
    } else {
      let usuario;
      if (this.estaPesquisando == 1) {
        for (let a of this.agendamentos) {
          usuario = this.usuarioService.getUsuario(a.cdMedico);

          if (usuario.nmUsuario.includes(this.query) || usuario.cpf.includes(this.query) || this.medicoService.getMedico(a.cdMedico).crm.includes(this.query)) {
            this.agendamentosExpostos.push(a);
          }
        }
      } else if (this.estaPesquisando == 2) {
        for (let a of this.agendamentos) {
          usuario = this.usuarioService.getUsuario(a.cdPaciente);

          if (usuario.nmUsuario.includes(this.query) || usuario.cpf.includes(this.query)) {
            this.agendamentosExpostos.push(a);
          }
        }
      }
    }

    this.alertaAberto = [];
    for (let a of this.agendamentosExpostos) {
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
      let resultado = this.agendamentoService.cancelarAgendamentoAdm(cdAgendamento);

      this.fecharAlerta(numAlerta);
      if (resultado == 1) {
        this.agendamentos = this.agendamentoService.getAgendamentos();
        this.agendamentosExpostos = this.agendamentos;
        this.exibirMensagem("O agendamento foi cancelado.");
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

  getNomeUsuario(cd: number): String {
    return this.usuarioService.getUsuario(cd).nmUsuario;
  }

  getEspecialidade(cd: number): string {
    return this.especialidadeService.getEspecialidade(cd).desc;
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

  back() {
    this.navController.navigateBack("/menu-admin");
  }
}
