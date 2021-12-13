import { Component, OnInit } from '@angular/core';
import { RestRecogerDatosService } from '../../services/rest-recogerDatos.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  public imgLogo: string;
  public correo: string;
  constructor(
    private restRecogerDatos: RestRecogerDatosService,

  )
  {
    this.imgLogo="../../../assets/logo_negro.png";
    this.correo="";
  }

  ngOnInit(): void {
    this.getCorreo();
  }


  public getCorreo(){
    this.restRecogerDatos.correo.subscribe(correo => {
      this.correo = correo
    });
    console.log(this.correo);
  }




}
