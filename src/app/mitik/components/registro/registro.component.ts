import { Component, OnInit } from '@angular/core';
import { RestGeneroService } from '../../services/rest-genero.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public imgLogo: string;
  public generos: any = [];
  constructor(private restGeneroService: RestGeneroService) {
    this.imgLogo="../../../assets/logo_negro.png";
  }

  ngOnInit(): void {
    this.getGeneros();
  }

  public getGeneros(){
    this.restGeneroService.getGeneros().subscribe((response) => {
      this.generos = response;
    });
  }

}
