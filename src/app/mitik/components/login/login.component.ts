import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from '../../models/Persona/persona';
import { RestPersonaService } from '../../services/rest-persona.service';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  submitted: boolean = false;
  persona?: Persona;
  public imgLogo: string;

  constructor(
    private formBuilder: FormBuilder,
    private restPersonaService: RestPersonaService,
    private restNotificationService: RestNotificacionesService,
    private restRecogerDatos: RestRecogerDatosService,
    private router: Router
  )
  {
    this.imgLogo="../../../assets/logo_negro.png";
    this.login = this.formBuilder.group({
      correo: ['',[Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
  }

  get formulario(){
    return this.login.controls;
  }

  public cambiarCorreo(){
    this.restRecogerDatos.cambiarCorreo(this.login.value.correo);
  }

  onSubmit(){
    this.submitted = true;
    if (this.login.invalid) return;

    var correo = this.login.value.correo;

    this.restPersonaService.iniciarSesion(this.login.value.correo, this.login.value.contraseña).subscribe({
      next: () => {
        this.restNotificationService.showMessage('Persona logueada correctamente.');
        console.log('Persona logueada correctamente');
        this.restRecogerDatos.cambiarCorreo(correo);
        this.router.navigateByUrl('principal');
      },
      error: e => {
        this.restNotificationService.showMessage('El correo no esta registrado.'),
        console.log('Persona no logueada');
      }
    })
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.login.reset();
  }

}
