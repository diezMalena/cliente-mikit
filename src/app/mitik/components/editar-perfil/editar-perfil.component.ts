import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestGeneroService } from '../../services/rest-genero.service';
import { RestPersonaService } from '../../services/rest-persona.service';
import { Persona } from '../../models/Persona/persona';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  editarPerfil: FormGroup;
  public correo:string;
  submitted: boolean = false;
  public imgLogo: string;
  public generos: any = [];
  public persona:any;
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
    this.correo="";
    this.editarPerfil = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      id_genero: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCorreo();
    this.getGeneros();
    this.personaAEditar();
  }



  get formulario() {
    return this.editarPerfil.controls;
  }

  public getCorreo(){
    this.restRecogerDatos.correo.subscribe(correo => {
      this.correo = correo
    });
    console.log(this.correo);
  }

  public getGeneros(){
    this.restGeneroService.getGeneros().subscribe((response) => {
      this.generos = response;
    });
    console.log(this.generos);
  }

  public personaAEditar(){
    this.restPersonaService.personaAEditar(this.correo).subscribe((response) => {
      this.persona = response;
    });

  }

  onSubmit(){
    this.submitted = true;
    if (this.editarPerfil.invalid) return;

    console.log(this.correo);
    this.restPersonaService.editarPersona(this.correo,this.editarPerfil.value.nombre,this.editarPerfil.value.contraseña,this.editarPerfil.value.ciudad,this.editarPerfil.value.descripcion,this.editarPerfil.value.id_genero).subscribe({
      next: () => {
        this.restNotificationService.showMessage('El usuario se ha actualizado correctamente.');
        console.log('El usuario se ha actualizado correctamente.');
        this.router.navigateByUrl('principal');
      },
      error: e => {
        this.restNotificationService.showMessage('Actualizacion incorrecta.');
        console.log('No se ha actualizado nada.');
      }
    });

  }

  borrarCuenta(correo:string){
    this.restPersonaService.borrarCuenta(correo).subscribe({
      next: () => {
        console.log('persona borrada correctamente');
        this.router.navigateByUrl('');
      },
      error: e => {
        this.restNotificationService.showMessage('Error: Persona no borrada');
      }
  });
  }


  onReset(){
    this.submitted = false;
    this.editarPerfil.reset();
  }
}
