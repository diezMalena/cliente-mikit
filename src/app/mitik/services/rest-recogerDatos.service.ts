import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestRecogerDatosService {

  public correo = new BehaviorSubject<string>("");

  constructor() { }

  public cambiarCorreo(correo: string){
    this.correo.next(correo);
  }
}
