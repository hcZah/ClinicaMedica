export class Paciente {
    cd: number;
    nome: string;
    cpf: string;
    email: string;
    endereco: string;
    senha: string;
    telefone: string;

    constructor() {
        this.cd = 0;
        this.nome = "";
        this.cpf = "";
        this.email = "";
        this.endereco = "";
        this.senha = "";
        this.telefone = "";
    }
}
