import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData } from '../model/login-data';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../model/usuario';

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

  /*
  cadastro(paciente: Paciente): Observable<Paciente> {
    const apiUrlTemp = this.apiUrl + "/";
    return this.http.post<Paciente>(apiUrlTemp, JSON.stringify(paciente), this.usuarioService.getHeaders());
  }

  getAll() {
    const apiUrlTemp = this.apiUrl + "/"
    return this.http.get<Paciente[]>(apiUrlTemp, this.usuarioService.getHeaders());
  }
  */

  cadastro(paciente: Paciente): boolean {
    if (paciente.cdUsuario == 0) {
      console.log("invalido");
      return false;
    }

    var pacientes: Paciente[] = this.getPacientes();

    if (!Array.isArray(pacientes)) {
      pacientes = [];
    }

    let index = pacientes.findIndex((p: Paciente) => p.cdUsuario == paciente.cdUsuario);
    if (index == -1) {
      pacientes.push(paciente);
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      return true;
    } else {
      pacientes[index] = paciente;
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      return true;
    }
  }


  getPacientes() {
    return JSON.parse(localStorage.getItem('pacientes') || '{}');
  }

  getPaciente(cdUsuario: number): Paciente { 
    var pacientes: Paciente[] = this.getPacientes();

    if (!Array.isArray(pacientes)) {
      return new Paciente(new Usuario);
    }

    let index = pacientes.findIndex((p: Paciente) => p.cdUsuario == cdUsuario);
    if (index == -1) {
      return new Paciente(new Usuario);
    } else {
      return pacientes[index];
    }
  }

  deletePaciente(cdUsuario: number): boolean {
    let pacientes = this.getPacientes();

    if (!Array.isArray(pacientes)) {
      return false;
    } else {
      let index = pacientes.findIndex((p: Paciente) => p.cdUsuario == cdUsuario);

      if (index == -1) {
        return false;
      } else {
        pacientes.splice(index, 1);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
        return true;
      }
    }
  }
}