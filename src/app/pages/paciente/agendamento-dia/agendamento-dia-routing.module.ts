import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentoDiaPage } from './agendamento-dia.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoDiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentoDiaPageRoutingModule {}
