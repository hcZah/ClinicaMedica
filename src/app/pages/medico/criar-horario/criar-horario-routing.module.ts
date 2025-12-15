import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarHorarioPage } from './criar-horario.page';

const routes: Routes = [
  {
    path: '',
    component: CriarHorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarHorarioPageRoutingModule {}
