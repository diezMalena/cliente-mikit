import { Component, OnInit } from '@angular/core';
import { RestPersonaService } from '../../services/rest-persona.service';
import { Persona } from '../../models/Persona/persona';
import { RestNotificacionesService } from 'src/app/shared/services/rest-notificaciones.service';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amigos-conectados',
  templateUrl: './amigos-conectados.component.html',
  styleUrls: ['./amigos-conectados.component.scss']
})
export class AmigosConectadosComponent implements OnInit {

  public correo:string;
  public imgLogo:string;
  public amigosConectados:any = [];
  constructor(
    private restPersonaService: RestPersonaService,
    private restRecogerDatosService:RestRecogerDatosService,
    private router: Router,


  ) {
    this.correo = "";
    this.imgLogo="../../../assets/logo_negro.png";
  }

  ngOnInit(): void {
    this.getCorreo();
    this.recogerAmigosConectados();
  }


  public getCorreo(){
    this.restRecogerDatosService.correo.subscribe(correo => {
      this.correo = correo
    });
    console.log(this.correo);
  }

  public recogerAmigosConectados(){
    this.restPersonaService.getAmigosConectados(this.correo).subscribe((response) =>{
      this.amigosConectados = response;
      console.log(this.amigosConectados);
    });
  }


}
