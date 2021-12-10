import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPreferenciasComponent } from './components/registro-preferencias/registro-preferencias.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path:'registro/registro-preferencias',
    component: RegistroPreferenciasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MitikRoutingModule { }

