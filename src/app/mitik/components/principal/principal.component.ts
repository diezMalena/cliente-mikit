import { Component, OnInit } from '@angular/core';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';
import { RestPersonaService } from '../../services/rest-persona.service';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  public imgLogo: string;
  public correo: string;
  public sugerencias: any = [];
  constructor(
    private restRecogerDatos: RestRecogerDatosService,
    private restPersonaService: RestPersonaService,
    private restNotificationService: RestNotificacionesService,
    private router: Router,
  )
  {
    this.imgLogo="../../../assets/logo_negro.png";
    this.correo="";
  }

  ngOnInit(): void {
    this.getCorreo();
    this.recuperarPersonasSugeridas();
  }


  public getCorreo(){
    this.restRecogerDatos.correo.subscribe(correo => {
      this.correo = correo
    });
    console.log(this.correo);
  }

  public recuperarPersonasSugeridas(){
    this.restPersonaService.traerSugerencias(this.correo).subscribe((response) =>{
      this.sugerencias = response;
      console.log(this.sugerencias);
    });
  }

  public darLike(correo2:string, boton:any){
    console.log(correo2);
    //console.log(boton);
    this.restPersonaService.darLike(this.correo, correo2).subscribe({
        next: () => {
          this.restNotificationService.showMessage('Like de' + this.correo +' a ' + correo2 +' añadido correctamente.');
          console.log('like añadido correctamente');
          boton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16"><path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/></svg>';
          console.log(boton);
          //this.router.navigateByUrl('login');
        },
        error: e => {
          this.restNotificationService.showMessage('Error: ' + e );
        }
    });
  }



}
