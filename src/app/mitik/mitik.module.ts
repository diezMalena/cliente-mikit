import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MitikRoutingModule } from './mitik-routing.module';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistroPreferenciasComponent } from './components/registro-preferencias/registro-preferencias.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegistroComponent,
    RegistroPreferenciasComponent
  ],
  imports: [
    SharedModule,
    MitikRoutingModule
  ]
})
export class MitikModule { }
