import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarHorarioPageRoutingModule } from './criar-horario-routing.module';

import { CriarHorarioPage } from './criar-horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarHorarioPageRoutingModule
  ],
  declarations: [CriarHorarioPage]
})
export class CriarHorarioPageModule {}
