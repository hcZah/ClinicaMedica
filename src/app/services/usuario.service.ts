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

  constructor(private http: HttpClient) { }

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

  cadastro(usuario: Usuario): Observable<Usuario> {
    const apiUrlTemp = this.apiUrl + "/register";
    return this.http.post<Usuario>(apiUrlTemp, JSON.stringify(usuario), this.requestOptions);
  }

  getTipoUsuario(usuario: Usuario): string {
    if (localStorage.getItem('tipoUsuario') != null) {
      return localStorage.getItem('tipoUsuario') || "erro";
    } else {
      const apiUrlTemp = this.apiUrl + "/getType/" + usuario.cd;
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

  //localStorage
  recuperarUsuario(): LoginResponse {
    let loginResponse: LoginResponse = JSON.parse(localStorage.getItem('loginData') || '{}');
    return loginResponse;
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
