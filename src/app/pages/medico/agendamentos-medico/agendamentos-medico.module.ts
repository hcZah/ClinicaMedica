import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosMedicoPageRoutingModule } from './agendamentos-medico-routing.module';

import { AgendamentosMedicoPage } from './agendamentos-medico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentosMedicoPageRoutingModule
  ],
  declarations: [AgendamentosMedicoPage]
})
export class AgendamentosMedicoPageModule {}
