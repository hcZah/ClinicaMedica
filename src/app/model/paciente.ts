import { Usuario } from "./usuario";

export class Paciente {
    cd: string;
    endereco: string;
    telefone: string;

    constructor(usuario: Usuario) {
        this.cd = usuario.cd;
        this.endereco = "";
        this.telefone = "";
    }
}
