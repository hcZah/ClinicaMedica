import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/v1/usuario';

  private headerDict = {
    'Access-Control-Allow-Origin': '*',
  };

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient) { }

  autenticar(email: String, senha: String): Observable<Usuario> {

    const objetoJS = {
      email: email,
      senha: senha
    };

    const objetoJson = JSON.stringify(objetoJS);

    const apiUrlTemp = this.apiUrl + "/auth";

    return this.http.post<Usuario>(apiUrlTemp, objetoJson);
  }

  getAll() {
    const apiUrlTemp = this.apiUrl + "/"
    return this.http.get<Usuario[]>(apiUrlTemp, this.requestOptions);
  }

  //localStorage
  carregar(): Usuario {
    let paciente = JSON.parse(localStorage.getItem('pacienteAutenticado') || '{}');
    return paciente;
  }

  //localStorage
  registrar(usuario: Usuario) {
    localStorage.setItem('PacienteAutenticado', JSON.stringify(usuario));
  }

  //localStorage
  encerrar() {
    localStorage.removeItem('pacienteAutenticado');
  }
}
