import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroPreferenciasComponent } from './components/registro-preferencias/registro-preferencias.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroComponent
  },
  {
    path:'registro-preferencias',
    component: RegistroPreferenciasComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'principal',
    component: PrincipalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MitikRoutingModule { }

