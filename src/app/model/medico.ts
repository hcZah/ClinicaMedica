import { Usuario } from "./usuario";

export class Medico {
    cdUsuario: number;
    crm: string;

    constructor(usuario: Usuario) {
        this.cdUsuario = usuario.cdUsuario;
        this.crm = "";
    }
}
