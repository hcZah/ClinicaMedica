import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefinirHorariosPageRoutingModule } from './definir-horarios-routing.module';

import { DefinirHorariosPage } from './definir-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefinirHorariosPageRoutingModule
  ],
  declarations: [DefinirHorariosPage]
})
export class DefinirHorariosPageModule {}
