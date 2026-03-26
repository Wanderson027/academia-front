import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { MainLayoutComponent } from './../app/layout/pages/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AlunoListComponent } from './../app/features/pages/aluno-list.component';
import { AlunoFormComponent } from './../app/features/pages/aluno-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
  path: '',
  component: MainLayoutComponent,
  canActivate: [authGuard],
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'alunos', component: AlunoListComponent },
    { path: 'alunos/novo', component: AlunoFormComponent },
    { path: 'alunos/:id/editar', component: AlunoFormComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];