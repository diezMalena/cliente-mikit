import { Component, OnInit } from '@angular/core';
import { RestPersonaService } from '../../services/rest-persona.service';
import { Persona } from '../../models/Persona/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.scss']
})
export class BuscarPersonaComponent implements OnInit {

  public imgLogo:string;
  public correo:string;
  public personaBuscada:any;
  buscar: FormGroup;
  submitted: boolean = false;
  encontrada: boolean = false;
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
    this.buscar = this.formBuilder.group({
      correo: ['',[Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getCorreo();
  }


  public getCorreo(){
    this.restRecogerDatosService.correo.subscribe(correo => {
      this.correo = correo
    });
    console.log(this.correo);
  }

  get formulario(){
    return this.buscar.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (this.buscar.invalid) return;

    this.restPersonaService.buscarPersona(this.buscar.value.correo).subscribe({
      next: (response) => {
        console.log('Buscando persona correctamente');
        this.personaBuscada = response;
        console.log(this.personaBuscada);
        this.encontrada = true;
        //this.router.navigateByUrl('principal');
      },
      error: e => {
        this.restNotificationService.showMessage('No hemos encontrado a esa persona.');
        this.encontrada = false;
      }
    })
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.buscar.reset();
  }


  public darLike(correo2:string, personaBuscada:any){
    this.restPersonaService.darLike(this.correo, correo2).subscribe({
        next: () => {
          console.log('like añadido correctamente');
          personaBuscada.dadoLike = true;
          //this.router.navigateByUrl('login');
        },
        error: e => {
          this.restNotificationService.showMessage('Error: ' + e );
        }
    });
  }
}
