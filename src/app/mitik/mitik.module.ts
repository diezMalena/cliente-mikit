import { NgModule } from '@angular/core';
import { RegistroComponent } from './components/registro/registro.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroPreferenciasComponent } from './components/registro-preferencias/registro-preferencias.component';
import { MitikRoutingModule } from './mitik-routing.module';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';


@NgModule({
  declarations: [
    RegistroComponent,
    RegistroPreferenciasComponent,
    LoginComponent,
    PrincipalComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MitikRoutingModule,
  ]
})
export class MitikModule { }
