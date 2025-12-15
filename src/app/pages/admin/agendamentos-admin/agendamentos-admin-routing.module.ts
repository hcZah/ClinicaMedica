import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentosAdminPage } from './agendamentos-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosAdminPageRoutingModule {}
