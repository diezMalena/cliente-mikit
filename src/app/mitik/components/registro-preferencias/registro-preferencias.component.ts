import { Component, OnInit } from '@angular/core';
import { RestGeneroService } from '../../services/rest-genero.service';
import { RestPersonaService } from '../../services/rest-persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../models/Persona/persona';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';
import { RestPreferenciaPersonaService } from '../../services/rest-preferenciaPersona.service';
import { PreferenciaPersona } from '../../models/PreferenciaPersona/preferenciaPersona';
import { GustoGenero } from '../../models/GustoGenero/gustoGenero';
import { RestGustoGeneroService } from '../../services/rest-gustoGenero.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-preferencias',
  templateUrl: './registro-preferencias.component.html',
  styleUrls: ['./registro-preferencias.component.scss']
})
export class RegistroPreferenciasComponent implements OnInit {

  public imgLogo: string;
  public generos: any = [];
  public preferenciaPersona: any = [];
  public gusGen: any = [];
  preferencias: FormGroup;
  submitted: boolean = false;
  public correo: string;

  constructor(
    private restGeneroService: RestGeneroService,
    private restPersonaService: RestPersonaService,
    private restNotificationService: RestNotificacionesService,
    private restRecogerDatos: RestRecogerDatosService,
    private restPreferenciaPersona: RestPreferenciaPersonaService,
    private restGustoGenero: RestGustoGeneroService,
    private router: Router,
    private formBuilder: FormBuilder
  )
  {
    this.correo = "";
    this.imgLogo="../../../assets/logo_negro.png";
    this.preferencias = this.formBuilder.group({
      tipoRelacion: ['', [Validators.required]],
      id_genero: ['',[Validators.required]],
      deporte: ['', [Validators.required]],
      arte: ['', [Validators.required]],
      musica: ['', [Validators.required]],
      politica: ['', [Validators.required]],
      tieneHijos:['', [Validators.required]],
      quiereHijos:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getGeneros();
    this.getCorreo();
    this.getPreferenciaPersona();
    this.getGustoGenero();
  }

  public getCorreo(){
    this.restRecogerDatos.correo.subscribe(correo => {
      this.correo = correo
    });
  }

  public getGeneros(){
    this.restGeneroService.getGeneros().subscribe((response) => {
      this.generos = response;
    });
  }

  public getPreferenciaPersona(){
    this.restPreferenciaPersona.getPreferenciaPersona().subscribe((response) => {
      this.preferenciaPersona = response;
    });
  }

  public getGustoGenero(){
    this.restGustoGenero.getGustoGenero().subscribe((response) => {
      this.gusGen = response;
    });
  }


  public insertarPreferencias(preferencia: PreferenciaPersona){
    this.restPersonaService.addPreferenciaPersona(preferencia).subscribe({
      next: () => {
        this.restNotificationService.showMessage(`Preferencia registrada correctamente.`, '');
        console.log('funciona preferencias');
        //this.router.navigateByUrl('registro');
      },
      error: e => {
        this.restNotificationService.showMessage('Error: ' + e );
        //this.router.navigateByUrl('registro');
      }
    });
  }


  get formulario(){
    return this.preferencias.controls;
  }

  onSubmit(){
    this.submitted = true;
    //if(this.preferencias.invalid) return;

    //this.restPersonaService.updatePersona(this.correo, this.preferencias.value.tieneHijos, this.preferencias.value.quiereHijos, this.preferencias.value.tipoRelacion).subscribe({

    this.restPersonaService.updatePersona(this.correo,this.preferencias.controls['tieneHijos'].value,this.preferencias.controls['quiereHijos'].value, this.preferencias.value.tipoRelacion).subscribe({
      next: () => {
        this.restNotificationService.showMessage(`Usuario ${this.preferencias.value.correo} registrado correctamente.`, '');
        console.log('Funciona actualizar persona');
        //this.router.navigateByUrl('registro');
      },
      error: e => {
        this.restNotificationService.showMessage('Error: ' + e );
        //this.router.navigateByUrl('registro');
      }
    });

    //Establecemos los 4 tipos de preferencias con sus datos:
      let preferencia_arte = new PreferenciaPersona(
        this.correo,
        1,
        this.preferencias.value.arte
      );

      let preferencia_musica = new PreferenciaPersona(
        this.correo,
        2,
        this.preferencias.value.musica
      );

      let preferencia_politica = new PreferenciaPersona(
        this.correo,
        3,
        this.preferencias.value.politica
      );

      let preferencia_deporte = new PreferenciaPersona(
        this.correo,
        4,
        this.preferencias.value.deporte
      );


        this.insertarPreferencias(preferencia_arte);
        this.insertarPreferencias(preferencia_musica);
        this.insertarPreferencias(preferencia_politica);
        this.insertarPreferencias(preferencia_deporte);


      let gusto_genero = new GustoGenero(
        this.correo,
        this.preferencias.value.id_genero
      );

      this.restPersonaService.addGustoGenero(gusto_genero).subscribe({
        next: () => {
          this.restNotificationService.showMessage(`Gusto genero add.`, '');
          console.log('Funciona gusto genero');
          //this.router.navigateByUrl('registro');
        },
        error: e => {
          this.restNotificationService.showMessage('Error: ' + e );
          //this.router.navigateByUrl('registro');
        }
      });


  }
}
