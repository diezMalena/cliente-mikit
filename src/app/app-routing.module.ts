import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './mitik/components/registro/registro.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('./core/core.module').then((m) => m.CoreModule) ,
  },
  {
    path:'mitik',
    loadChildren:() => import('./mitik/mitik.module').then((m) => m.MitikModule) ,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
