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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/paciente/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'menu-admin',
    loadChildren: () => import('./pages/admin/menu-admin/menu-admin.module').then(m => m.MenuAdminPageModule)
  },
  {
    path: 'medico',
    loadChildren: () => import('./pages/admin/medico/medico.module').then(m => m.MedicoPageModule)
  },
  {
    path: 'medico/:cdUsuario',
    loadChildren: () => import('./pages/admin/medico/medico.module').then(m => m.MedicoPageModule)
  },
  {
    path: 'medicos',
    loadChildren: () => import('./pages/admin/medicos/medicos.module').then(m => m.MedicosPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./pages/admin/paciente/paciente.module').then(m => m.PacientePageModule)
  },
  {
    path: 'paciente/:cdUsuario',
    loadChildren: () => import('./pages/admin/paciente/paciente.module').then(m => m.PacientePageModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pages/admin/pacientes/pacientes.module').then(m => m.PacientesPageModule)
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./pages/paciente/agendamento/agendamento.module').then( m => m.AgendamentoPageModule)
  },
  {
    path: 'agendamento-dia',
    loadChildren: () => import('./pages/paciente/agendamento-dia/agendamento-dia.module').then( m => m.AgendamentoDiaPageModule)
  },
  {
    path: 'agendamento-dia/:ano/:mes/:dia/:cdMedico/:cdEspecialidade',
    loadChildren: () => import('./pages/paciente/agendamento-dia/agendamento-dia.module').then( m => m.AgendamentoDiaPageModule)
  },
  {
    path: 'agendamentos-medico',
    loadChildren: () => import('./pages/medico/agendamentos-medico/agendamentos-medico.module').then( m => m.AgendamentosMedicoPageModule)
  },
  {
    path: 'especialidade',
    loadChildren: () => import('./pages/admin/especialidade/especialidade.module').then( m => m.EspecialidadePageModule)
  },
  {
    path: 'especialidade/:cdEspecialidade',
    loadChildren: () => import('./pages/admin/especialidade/especialidade.module').then( m => m.EspecialidadePageModule)
  },
  {
    path: 'especialidades',
    loadChildren: () => import('./pages/admin/especialidades/especialidades.module').then( m => m.EspecialidadesPageModule)
  },
  {
    path: 'agendamentos-admin',
    loadChildren: () => import('./pages/admin/agendamentos-admin/agendamentos-admin.module').then( m => m.AgendamentosAdminPageModule)
  },
  {
    path: 'definir-horarios',
    loadChildren: () => import('./pages/medico/definir-horarios/definir-horarios.module').then( m => m.DefinirHorariosPageModule)
  },
  {
    path: 'definir-horarios/:cdMedico',
    loadChildren: () => import('./pages/medico/definir-horarios/definir-horarios.module').then( m => m.DefinirHorariosPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
