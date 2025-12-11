import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../model/medico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://localhost:8080/api/v1/medico';
 
  private headerDict = {
    'Access-Control-Allow-Origin': '*',
  };

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient) { }
/*
  autenticar(email: String, senha: String): Observable<Medico> {

    const objetoJS = {
      email: email,
      senha: senha
    };

    const objetoJson = JSON.stringify(objetoJS);

    const apiUrlTemp = this.apiUrl + "/auth";

    return this.http.post<Medico>(apiUrlTemp, objetoJson);
  }

  getAll() {
    const apiUrlTemp = this.apiUrl + "/"
    return this.http.get<Medico[]>(apiUrlTemp, this.requestOptions);
  }

  //localStorage
  carregar(): Medico {
    let paciente = JSON.parse(localStorage.getItem('pacienteAutenticado') || '{}');
    return paciente;
  }

  //localStorage
  registrar(medico: Medico) {
    localStorage.setItem('PacienteAutenticado', JSON.stringify(medico));
  }

  //localStorage
  encerrar() {
    localStorage.removeItem('pacienteAutenticado');
  }
*/

 cadastro(medico: Medico): boolean {
    if (medico.cdUsuario == 0) {
      console.log("invalido");
      return false;
    }
    if (!this.medicoValido(medico)) {
      console.log("invalido");
      return false;
    }

    var medicos: Medico[] = this.getMedicos();

    if (!Array.isArray(medicos)) {
      medicos = [];
    }

    let index = medicos.findIndex((m: Medico) => m.cdUsuario == medico.cdUsuario);
    if (index == -1) {
      medicos.push(medico);
      localStorage.setItem('medicos', JSON.stringify(medicos));
      return true;
    } else {
      medicos[index] = medico;
      localStorage.setItem('medicos', JSON.stringify(medicos));
      return true;
    }
  }

  getMedicos() {
    return JSON.parse(localStorage.getItem('medicos') || '{}');
  }

  getMedico(cdUsuario: number): Medico { 
    var medicos: Medico[] = this.getMedicos();

    if (!Array.isArray(medicos)) {
      return new Medico(new Usuario);
    }

    let index = medicos.findIndex((m: Medico) => m.cdUsuario == cdUsuario);
    if (index == -1) {
      return new Medico(new Usuario);
    } else {
      return medicos[index];
    }
  }

  private medicoValido(medico: Medico): boolean {
    let medicos: Medico[] = this.getMedicos();

    if (!Array.isArray(medicos)) {
      console.log("valido");
      return true;
    }

    let teste: Medico | undefined = medicos.find((m: Medico) => (medico.cdUsuario != medico.cdUsuario && medico.crm == m.crm));

    if (teste != undefined) {
      console.log("invalido");
      return false;
    }

    console.log("valido");
    return true;
  }

  deleteMedico(cdUsuario: number): boolean {
    let medicos = this.getMedicos();

    if (!Array.isArray(medicos)) {
      return false;
    } else {
      let index = medicos.findIndex((m: Medico) => m.cdUsuario == cdUsuario);

      if (index == -1) {
        return false;
      } else {
        medicos.splice(index, 1);
        localStorage.setItem("medicos", JSON.stringify(medicos));
        return true;
      }
    }
  }
}
