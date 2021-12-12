import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from '../../models/Persona/persona';
import { RestPersonaService } from '../../services/rest-persona.service';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';

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

  onSubmit(){
    this.submitted = true;
    //if (this.login.invalid) return;

    this.restPersonaService.iniciarSesion(this.login.value.correo, this.login.value.contraseña).subscribe({
      next: () => {
        this.restNotificationService.showMessage('Persona logueada correctamente.');
        console.log('Persona logueada correctamente');
        //this.router.navigateByUrl('');
      },
      error: e => {
        this.restNotificationService.showMessage(`Fallo en el login: `+e),
        console.log('Persona no registrada');
      }
    })
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.login.reset();
  }

}
