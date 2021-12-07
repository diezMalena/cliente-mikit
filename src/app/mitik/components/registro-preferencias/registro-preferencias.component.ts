import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-preferencias',
  templateUrl: './registro-preferencias.component.html',
  styleUrls: ['./registro-preferencias.component.scss']
})
export class RegistroPreferenciasComponent implements OnInit {

  public imgLogo: string;
  constructor() {
    this.imgLogo="../../../assets/logo_negro.png";
  }

  ngOnInit(): void {
  }

}
