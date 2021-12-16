import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestGeneroService } from '../../services/rest-genero.service';
import { RestPersonaService } from '../../services/rest-persona.service';
import { Persona } from '../../models/Persona/persona';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registro: FormGroup;
  submitted: boolean = false;
  public imgLogo: string;
  public generos: any = [];
  constructor(
    private restGeneroService: RestGeneroService,
    private restPersonaService: RestPersonaService,
    private restNotificationService: RestNotificacionesService,
    private restRecogerDatos: RestRecogerDatosService,
    private router: Router,
    private formBuilder: FormBuilder
    )
    {

    this.imgLogo="../../../assets/logo_negro.png";
    this.registro = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['',[Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(5)]],
      fechaNacimiento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      id_genero: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getGeneros();
  }

  get formulario() {
    return this.registro.controls;
  }

  public getGeneros(){
    this.restGeneroService.getGeneros().subscribe((response) => {
      this.generos = response;
    });
  }

  public cambiarCorreo(){
    this.restRecogerDatos.cambiarCorreo(this.registro.value.correo);
  }

  onSubmit(){
    this.submitted = true;
    if (this.registro.invalid) return;


    let persona = new Persona(
      this.registro.value.correo,
      this.registro.value.nombre,
      this.registro.value.contraseña,
      this.registro.value.fechaNacimiento,
      this.registro.value.ciudad,
      this.registro.value.descripcion,
      "0", //tipoRelacion
      "0", //foto
      0, //tiene
      0, //quiere
      0, //activado
      0, //conectado
      0,//tema
      this.registro.value.id_genero
    );


    this.restPersonaService.addPersona(persona).subscribe({
      next: () => {
        this.restNotificationService.showMessage('El usuario se ha registrado correctamente.');
        //AQUI NO MUESTRA ESTE MENSAJE!
        console.log('Funciona registro');
        this.restRecogerDatos.cambiarCorreo(persona.correo);
        //console.log(persona.correo);
        this.router.navigateByUrl('registro-preferencias');
      },
      error: e => {
        this.restNotificationService.showMessage('Registro incorrecto.')
        //AQUI NO MUESTRA EL ERROR!
      }
    });


    this.onReset();
  }


  onReset(){
    this.submitted = false;
    this.registro.reset();
  }
}
