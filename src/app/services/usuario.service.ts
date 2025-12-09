import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../model/login-response';
import { LoginData } from '../model/login-data';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private headerDict = {
    'Content-Type': 'application/json',
  };

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(/*private http: HttpClient*/) { }

  /*
  autenticar(email: String, senha: String): LoginResponse {

    const objetoJS = {
      email: email,
      senha: senha
    };

    const objetoJson = JSON.stringify(objetoJS);

    const apiUrlTemp = this.apiUrl + "/login";

    let loginResponse = new LoginResponse();

    this.http.post<any>(apiUrlTemp, objetoJson, this.requestOptions).subscribe({
      next(object) {
        loginResponse.usuario = object.usuario;
        loginResponse.token = object.token.token;
      },
    });

    return loginResponse;
  }
  */

  /*
  cadastro(usuario: Usuario): Observable<Usuario> {
    const apiUrlTemp = this.apiUrl + "/register";
    return this.http.post<Usuario>(apiUrlTemp, JSON.stringify(usuario), this.requestOptions);
  }

  getTipoUsuario(usuario: Usuario): string {
    if (localStorage.getItem('tipoUsuario') != null) {
      return localStorage.getItem('tipoUsuario') || "erro";
    } else {
      const apiUrlTemp = this.apiUrl + "/getType/" + usuario.cdUsuario;
      this.http.get<string>(apiUrlTemp).subscribe({
        next(type: string) {
          localStorage.setItem('tipoUsuario', type);
          return type;
        },
        error(e) {
          return "erro";
        }
      });
    }
    return "erro";
  }

  getAll() {
    const apiUrlTemp = this.apiUrl + "/"
    return this.http.get<Usuario[]>(apiUrlTemp, this.requestOptions);
  }
  */

  //localStorage
  recuperarUsuario(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioAutenticado') || '{}');
  }

  //localStorage
  registrarUsuario(loginData: LoginResponse) {
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }

  //localStorage
  encerrar() {
    localStorage.removeItem('loginData');
    localStorage.removeItem('tipoUsuario');
  }

  getUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem('usuarios') || '{}');
  }

  getUsuario(cdUsuario: number): Usuario {
    var usuarios: Usuario[] = this.getUsuarios();

    if (!Array.isArray(usuarios)) {
      return new Usuario;
    }

    let index = usuarios.findIndex((u: Usuario) => u.cdUsuario == cdUsuario);
    if (index == -1) {
      return new Usuario;
    } else {
      return usuarios[index];
    }
  }

  logar(usuario: Usuario) {
    localStorage.setItem("usuarioAutenticado", JSON.stringify(usuario));
  }

  deslogar() {
    localStorage.removeItem("usuarioAutenticado");
  }

  autenticar(email: string, senha: string): Usuario {
    this.deslogar;
    var usuarios: Usuario[] = this.getUsuarios();

    if (!Array.isArray(usuarios)) {
      return new Usuario;
    }

    var usuario: Usuario | undefined = usuarios.find((u: Usuario) => (u.email == email && u.senha == senha));

    if (usuario == undefined) {
      return new Usuario;
    }

    this.logar(usuario);

    return usuario;
  }

  cadastro(usuario: Usuario): boolean {
    if (usuario.cpf == "" || usuario.email == "" || usuario.senha == "" || usuario.nmUsuario == "" || usuario.role == "") {
      console.log("invalido");
      return false;
    }
    if (!this.usuarioValido(usuario)) {
      console.log("invalido");
      return false;
    }

    var usuarios: Usuario[] = this.getUsuarios();

    if (!Array.isArray(usuarios)) {
      usuarios = [];
    }

    if (usuario.cdUsuario == 0) {
      usuario.cdUsuario = this.getValidId();
      usuarios.push(usuario);
    } else {
      let index = usuarios.findIndex((u: Usuario) => u.cdUsuario == usuario.cdUsuario);
      if (index == -1) {
        alert("index")
        return false;
      }
      usuarios[index] = usuario;
    }
    alert(usuario.cdUsuario)

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return true;
  }

  private getValidId(): number {
    let usuarios = this.getUsuarios();
    if (!Array.isArray(usuarios)) {
      return Math.floor(Math.random() * 10000000) + 1;
    }

    var id: number = -1;
    let valid = false;

    while (!valid) {
      valid = true;
      id = Math.floor(Math.random() * 10000000) + 1;
      let test = usuarios.find((u: Usuario) => u.cdUsuario == id);

      if (test != undefined) {
        valid = false;
      }
    }

    return id;
  }

  private usuarioValido(usuario: Usuario): boolean {
    let usuarios: Usuario[] = this.getUsuarios();

    if (!Array.isArray(usuarios)) {
      console.log("valido");
      return true;
    }

    let teste: Usuario | undefined = usuarios.find((u: Usuario) => (u.cdUsuario != usuario.cdUsuario && (u.cpf == usuario.cpf || u.email == usuario.email)));

    if (teste != undefined) {
      console.log("invalido");
      return false;
    }

    console.log("valido");
    return true;
  }

  deleteUsuario(cdUsuario: number): boolean {
    let usuarios = this.getUsuarios();

    if (!Array.isArray(usuarios)) {
      return false;
    } else {
      let index = usuarios.findIndex((u: Usuario) => u.cdUsuario = cdUsuario);

      if (index == -1) {
        return false;
      } else {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        return true;
      }
    }
  }

  getHeaders() {
    let headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken(),
    };

    let requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    return requestOptions;
  }

  private getToken() {
    return JSON.parse(localStorage.getItem('loginData') || "").token;
  }
}
