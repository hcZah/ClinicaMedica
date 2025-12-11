import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentosMedicoPage } from './agendamentos-medico.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentosMedicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosMedicoPageRoutingModule {}
