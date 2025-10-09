import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData } from '../model/login-data';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8080/api/paciente';

  private headerDict = {
    'Content-Type': 'application/json',
  };

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }
  cadastro(paciente: Paciente): Observable<Paciente> {
    const apiUrlTemp = this.apiUrl + "/";
    return this.http.post<Paciente>(apiUrlTemp, JSON.stringify(paciente),this.usuarioService.getHeaders());
  }

  getAll() {
    const apiUrlTemp = this.apiUrl + "/"
    return this.http.get<Paciente[]>(apiUrlTemp, this.usuarioService.getHeaders());
  }
}