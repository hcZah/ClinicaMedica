import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8080/api/v1/paciente';

  constructor(private http: HttpClient) { }

  autenticar(email: String, senha: String): Observable<Paciente> {

    const objetoJS = {
      email: email,
      senha: senha
    };

    const objetoJson = JSON.stringify(objetoJS);

    const apiUrlTemp = this.apiUrl + "/auth"

    return this.http.post<Paciente>(apiUrlTemp, objetoJson);
  }

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

  buscarPorId(cd: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${cd}`);
  }

}