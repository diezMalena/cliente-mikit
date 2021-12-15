import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmigosConectadosComponent } from './components/amigos-conectados/amigos-conectados.component';
import { LoginComponent } from './components/login/login.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroPreferenciasComponent } from './components/registro-preferencias/registro-preferencias.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path:'registro-preferencias',
    component: RegistroPreferenciasComponent
  },
  {
    path:'registro',
    component: RegistroComponent
  },
  {
    path:'principal',
    component: PrincipalComponent
  },
  {
    path:'notificaciones',
    component: NotificacionesComponent
  },
  {
    path:'amigos-conectados',
    component: AmigosConectadosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MitikRoutingModule { }

