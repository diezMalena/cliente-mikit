import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestNotificacionesService {

  constructor(private http: HttpClient) { }

  public getNotificaciones(correo:string){
    let url: string = "http://127.0.0.1:8000/api/notificaciones";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={correo:correo};
    return this.http.post(url, dato, {headers: headers});
  }

  public cambiarLeido(correo:string){
    let url: string = "http://127.0.0.1:8000/api/cambiarLeido";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={correo:correo};
    return this.http.post(url, dato, {headers: headers});
  }
}
