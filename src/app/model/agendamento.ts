export class Agendamento {
    cdAgendamento: number;

    cdPaciente: number;
    cdMedico: number;
    cdEspecialidade: number;

    dia: number;
    mes: number;
    ano: number;

    hora: number;

    constructor() {
        this.cdAgendamento = 0;
        this.cdPaciente = 0;
        this.cdMedico = 0;
        this.cdEspecialidade = 0;
        this.dia = 0;
        this.mes = 0;
        this.ano = 0;
        this.hora = -1;
    }
}
