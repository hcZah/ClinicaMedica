import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Agendamento } from 'src/app/model/agendamento';
import { Especialidade } from 'src/app/model/especialidade';
import { Medico } from 'src/app/model/medico';
import { Usuario } from 'src/app/model/usuario';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { CalendarioService } from 'src/app/services/calendario.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { HorarioService } from 'src/app/services/horario.service';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agendamento-dia',
  templateUrl: './agendamento-dia.page.html',
  styleUrls: ['./agendamento-dia.page.scss'],
  standalone: false,
})
export class AgendamentoDiaPage implements ViewWillEnter {
  agendamento: Agendamento;

  usuarioAutenticado: Usuario;

  diaHoje: number;
  mesHoje: number;
  mesHojeTexto: string;
  anoHoje: number;

  medico: Medico;
  horarios: string[];

  especialidade: Especialidade;

  constructor(private toastController: ToastController, private agendamentoService: AgendamentoService, private navController: NavController, private usuarioService: UsuarioService, private calendarioService: CalendarioService, private activatedRoute: ActivatedRoute, private medicoService: MedicoService, private especialidadeService: EspecialidadeService, private horarioService: HorarioService) {
    this.agendamento = new Agendamento;

    this.usuarioAutenticado = new Usuario();

    this.diaHoje = 0;
    this.mesHoje = 0;
    this.mesHojeTexto = ""
    this.anoHoje = 0;

    this.medico = new Medico(new Usuario());
    this.horarios = [];

    this.especialidade = new Especialidade();
  }

  ionViewWillEnter() {
    this.usuarioAutenticado = this.usuarioService.recuperarUsuario();
    if (this.usuarioAutenticado == null || this.usuarioAutenticado.cdUsuario == 0 || this.usuarioAutenticado.role != "pac") {
      if (this.usuarioAutenticado.role == "med") {
        //
      } else if (this.usuarioAutenticado.role == "adm") {
        this.navController.navigateForward("/menu-admin");
      } else {
        this.navController.navigateBack("/login");
      }
    }

    this.anoHoje = parseInt(this.activatedRoute.snapshot.params['ano']);
    if (this.anoHoje == undefined) {
      this.back();
    }

    this.mesHoje = parseInt(this.activatedRoute.snapshot.params['mes']);
    if (this.mesHoje == undefined) {
      this.back();
    }
    this.mesHojeTexto = this.calendarioService.numeroParaMes(this.mesHoje);

    this.diaHoje = parseInt(this.activatedRoute.snapshot.params['dia']);
    if (this.diaHoje == undefined) {
      this.back();
    }

    let cdMedico = parseInt(this.activatedRoute.snapshot.params['cdMedico'])
    this.medico = this.medicoService.getMedico(cdMedico);
    if (this.medico.cdUsuario == 0) {
      this.back();
    }
    this.horarios = this.horarioService.getHorarios();

    let cdEspecialidade = parseInt(this.activatedRoute.snapshot.params['cdEspecialidade'])
    this.especialidade = this.especialidadeService.getEspecialidade(cdEspecialidade);
    if (this.medico.cdUsuario == 0) {
      this.back();
    }
  }

  agendar(horario: string) {
    this.agendamento.ano = this.anoHoje;
    this.agendamento.mes = this.mesHoje;
    this.agendamento.dia = this.diaHoje;

    this.agendamento.hora = this.horarioService.stringParaNumero(horario);

    this.agendamento.cdPaciente = this.usuarioAutenticado.cdUsuario;

    this.agendamento.cdMedico = this.medico.cdUsuario;

    this.agendamento.cdEspecialidade = this.especialidade.cdEspecialidade;

    if (this.agendamentoService.cadastrarAgendamento(this.agendamento)) {
      this.exibirMensagem("Agendamento realizado com sucesso.");
      this.navController.navigateBack("/inicio");
    } else {
      this.exibirMensagem("Não foi possível realizar agendamento.");
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

  back() {
    this.navController.navigateBack("/agendamento");
  }
}
