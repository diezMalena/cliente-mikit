import { Component, OnInit } from '@angular/core';
import { RestPersonaService } from '../../services/rest-persona.service';
import { Persona } from '../../models/Persona/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-olvido-contrasenia',
  templateUrl: './olvido-contrasenia.component.html',
  styleUrls: ['./olvido-contrasenia.component.scss']
})
export class OlvidoContraseniaComponent implements OnInit {

  public imgLogo:string;
  public correo:string;
  olvido: FormGroup;
  submitted: boolean = false;
  constructor(
    private restRecogerDatosService: RestRecogerDatosService,
    private formBuilder: FormBuilder,
    private restPersonaService: RestPersonaService,
    private router: Router,
    private restNotificationService: RestNotificacionesService,


  )
  {
    this.correo = "";
    this.imgLogo="../../../assets/logo_negro.png";
    this.olvido = this.formBuilder.group({
      correo: ['',[Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  get formulario(){
    return this.olvido.controls;
  }


  onSubmit(){
    this.submitted = true;
    if (this.olvido.invalid) return;

    this.restPersonaService.restaurarPassword(this.olvido.value.correo).subscribe({
      next: () => {
        this.restNotificationService.showMessage('Le hemos mandado un correo con la nueva contraseña.');
        console.log('Pedimos cambio de contraseña');
      },
      error: e => {
        this.restNotificationService.showMessage('No hemos enviado el correo.');
      }
    })
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.olvido.reset();
  }
}
