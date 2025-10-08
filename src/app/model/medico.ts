import { Usuario } from "./usuario";

export class Medico {
    cd: number;
    crm: string;

    constructor(usuario: Usuario) {
        this.cd = usuario.cd;
        this.crm = "";
    }
}
