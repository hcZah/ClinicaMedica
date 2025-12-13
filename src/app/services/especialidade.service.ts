import { Injectable } from '@angular/core';
import { Especialidade } from '../model/especialidade';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EspecialidadeMedico } from '../model/especialidade-medico';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor() { }

  private apiUrl = 'http://localhost:8080/api/especialidade';

  private headerDict = {
    'Content-Type': 'application/json',
  };

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };


  private getValidId(): number {
    let especialidades = this.getEspecialidades();
    if (!Array.isArray(especialidades)) {
      return Math.floor(Math.random() * 10000000) + 1;
    }

    var id: number = -1;
    let valid = false;

    while (!valid) {
      valid = true;
      id = Math.floor(Math.random() * 10000000) + 1;
      let test = especialidades.find((u: Especialidade) => u.cdEspecialidade == id);

      if (test != undefined) {
        valid = false;
      }
    }

    return id;
  }

  cadastro(especialidade: Especialidade): boolean {
    if (especialidade.desc == "") {
      console.log("invalido");
      return false;
    }
    if (!this.especialidadeValida(especialidade)) {
      console.log("invalido");
      return false;
    }

    var especialidades: Especialidade[] = this.getEspecialidades();
    if (!Array.isArray(especialidades)) {
      especialidades = [];
    }

    if (especialidade.cdEspecialidade == 0) {
      especialidade.cdEspecialidade = this.getValidId();
      especialidades.push(especialidade);
    } else {
      let index = especialidades.findIndex((e: Especialidade) => e.cdEspecialidade == especialidade.cdEspecialidade);
      if (index == -1) {
        return false;
      }
      especialidades[index] = especialidade;
    }

    localStorage.setItem("especialidades", JSON.stringify(especialidades));

    return true;
  }

  getEspecialidades(): Especialidade[] {
    return JSON.parse(localStorage.getItem('especialidades') || '[]');
  }

  deleteEspecialidade(cdEspecialidade: number): boolean {
    let especialidades = this.getEspecialidades();

    if (!Array.isArray(especialidades)) {
      return false;
    } else {
      let index = especialidades.findIndex((e: Especialidade) => e.cdEspecialidade == cdEspecialidade);

      if (index == -1) {
        return false;
      } else {
        especialidades.splice(index, 1);
        localStorage.setItem("especialidades", JSON.stringify(especialidades));
        return true;
      }
    }
  }
  private especialidadeValida(especialidade: Especialidade): boolean {
    let especialidades: Especialidade[] = this.getEspecialidades();

    if (!Array.isArray(especialidades)) {
      console.log("valido");
      return true;
    }

    let teste: Especialidade | undefined = especialidades.find((u: Especialidade) => (u.cdEspecialidade != especialidade.cdEspecialidade && (u.desc == especialidade.desc)));

    if (teste != undefined) {
      console.log("invalido");
      return false;
    }

    console.log("valido");
    return true;
  }

  getEspecialidade(cdEspecialidade: number): Especialidade {
    var especialidades: Especialidade[] = this.getEspecialidades();

    if (!Array.isArray(especialidades)) {
      return new Especialidade();
    }

    let index = especialidades.findIndex((p: Especialidade) => p.cdEspecialidade == cdEspecialidade);
    if (index == -1) {
      return new Especialidade();
    } else {
      return especialidades[index];
    }
  }

  getEspecialidadesPorMedico(cdMedico: number) {
    let especialidadesMedicos: EspecialidadeMedico[] = JSON.parse(localStorage.getItem('especialidade-medico') || '{}');
    if (!Array.isArray(especialidadesMedicos)) {
      especialidadesMedicos = [];
    }

    let especialidadesMedicos_filter = especialidadesMedicos.filter((em: EspecialidadeMedico) => em.cdMedico == cdMedico);

    let especialidades: Especialidade[] = [];
    for (let i = 0; i < especialidadesMedicos_filter.length; i++) {
      especialidades.push(this.getEspecialidade(especialidadesMedicos_filter[i].cdEspecialidade));
    }

    return especialidades;
  }
}
