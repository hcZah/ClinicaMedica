import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefinirHorariosPage } from './definir-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: DefinirHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinirHorariosPageRoutingModule {}
