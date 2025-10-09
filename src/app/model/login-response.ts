import { Usuario } from "./usuario";

export class LoginResponse {
    usuario: Usuario;
    token: string;

    constructor() {
        this.usuario = new Usuario();
        this.token = "";
    }
}
