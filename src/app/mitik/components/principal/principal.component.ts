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

  public darLike(correo2:string, sugerencia:any){
    this.restPersonaService.darLike(this.correo, correo2).subscribe({
        next: () => {
          console.log('like añadido correctamente');
          sugerencia.dadoLike = true;
          //this.router.navigateByUrl('login');
        },
        error: e => {
          this.restNotificationService.showMessage('Error: ' + e );
        }
    });
  }



}
