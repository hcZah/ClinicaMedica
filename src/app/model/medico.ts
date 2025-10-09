import { Usuario } from "./usuario";

export class Medico {
    cd: string;
    crm: string;

    constructor(usuario: Usuario) {
        this.cd = usuario.cd;
        this.crm = "";
    }
}
