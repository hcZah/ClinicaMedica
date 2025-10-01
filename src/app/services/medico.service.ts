import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../model/medico';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
