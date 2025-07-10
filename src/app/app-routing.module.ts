import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'menu-admin',
    loadChildren: () => import('./pages/admin/menu-admin/menu-admin.module').then( m => m.MenuAdminPageModule)
  },
  {
    path: 'medico',
    loadChildren: () => import('./pages/admin/medico/medico.module').then( m => m.MedicoPageModule)
  },
  {
    path: 'medicos',
    loadChildren: () => import('./pages/admin/medicos/medicos.module').then( m => m.MedicosPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./pages/admin/paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pages/admin/pacientes/pacientes.module').then( m => m.PacientesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
