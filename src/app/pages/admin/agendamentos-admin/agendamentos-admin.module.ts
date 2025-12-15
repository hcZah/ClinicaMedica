import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosAdminPageRoutingModule } from './agendamentos-admin-routing.module';

import { AgendamentosAdminPage } from './agendamentos-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentosAdminPageRoutingModule
  ],
  declarations: [AgendamentosAdminPage]
})
export class AgendamentosAdminPageModule {}
