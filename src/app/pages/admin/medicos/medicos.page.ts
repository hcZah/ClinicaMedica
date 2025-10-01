import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/model/medico';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
  standalone: false,
})
export class MedicosPage implements OnInit {
  medicos: Medico[];

  constructor(private medicoService: MedicoService) {
    this.medicos = [];
  }

  ngOnInit() {
    let observable = this.medicoService.getAll().subscribe({
      next: value => this.medicos = value,
      error: err => console.log("Error: " + err),
    });
  }

}
