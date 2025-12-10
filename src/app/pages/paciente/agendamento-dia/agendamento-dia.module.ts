import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentoDiaPageRoutingModule } from './agendamento-dia-routing.module';

import { AgendamentoDiaPage } from './agendamento-dia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentoDiaPageRoutingModule
  ],
  declarations: [AgendamentoDiaPage]
})
export class AgendamentoDiaPageModule {}
