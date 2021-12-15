import { Component, OnInit } from '@angular/core';
import { RestNotificacionesService } from '../../services/rest-notificaciones.service';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  public correo: string;
  public imgLogo: string;
  public notificaciones:any = [];

  constructor(
    private restNotificacionesService: RestNotificacionesService,
    private restRecogerDatos: RestRecogerDatosService,

  ) {
    this.correo = "";
    this.imgLogo="../../../assets/logo_negro.png";

  }

  ngOnInit(): void {
    this.getCorreo();
    this.recogerNotificaciones();
  }


  public getCorreo(){
    this.restRecogerDatos.correo.subscribe(correo => {
      this.correo = correo
    });
    console.log(this.correo);
  }

  public recogerNotificaciones(){
    this.restNotificacionesService.getNotificaciones(this.correo).subscribe((response) =>{
      this.notificaciones = response;
      this.cambiarLeido();
      console.log(this.notificaciones);
    });
  }

  public cambiarLeido(){
    this.restNotificacionesService.cambiarLeido(this.correo).subscribe((response) => {
      console.log('se ha cambiado');
    });
  }
}
