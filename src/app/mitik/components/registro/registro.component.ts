import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public imgLogo: string;
  constructor() {
    this.imgLogo="../../../assets/logo_negro.png";
  }

  ngOnInit(): void {
  }

}
