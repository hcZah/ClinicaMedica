import { Usuario } from "./usuario";

export class Paciente {
    cdUsuario: string;
    endereco: string;
    telefone: string;

    constructor(usuario: Usuario) {
        this.cdUsuario = usuario.cdUsuario;
        this.endereco = "";
        this.telefone = "";
    }
}
