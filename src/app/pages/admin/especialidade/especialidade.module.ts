import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialidadePageRoutingModule } from './especialidade-routing.module';

import { EspecialidadePage } from './especialidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspecialidadePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EspecialidadePage]
})
export class EspecialidadePageModule {}
