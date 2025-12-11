export class Agendamento {
    cdAgendamento: number;
    cdPaciente: number;
    cdMedico: number;
    cdEspecialidade: number;
    dtAgendamento: string;
    hrAgendamento: string;

    constructor() {
        this.cdAgendamento = 0;
        this.cdPaciente = 0;
        this.cdMedico = 0;
        this.cdEspecialidade = 0;
        this.dtAgendamento = "00/00/0000";
        this.hrAgendamento = "00:00";
    }
}
