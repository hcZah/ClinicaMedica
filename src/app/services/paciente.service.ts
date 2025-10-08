import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData } from '../model/login-data';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8080/api/v1/paciente';

  constructor(private http: HttpClient) { }

  //localStorage
  carregar(): Paciente {
    let paciente = JSON.parse(localStorage.getItem('pacienteAutenticado') || '{}');
    return paciente;
  }

  //localStorage
  registrar(paciente: Paciente) {
    localStorage.setItem('PacienteAutenticado', JSON.stringify(paciente));
  }

  //localStorage
  encerrar() {
    localStorage.removeItem('pacienteAutenticado');
  }

  cadastrar(paciente: Paciente): Observable<number> {
    return this.http.post<number>(this.apiUrl, JSON.stringify(paciente));
  }

  buscarPorId(cd: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${cd}`);
  }
}