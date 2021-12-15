import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from '../models/Persona/persona';
import { PersonaResponse } from '../models/Persona/persona-response';
import { map } from 'rxjs';
import { PreferenciaPersona } from '../models/PreferenciaPersona/preferenciaPersona';
import { GustoGenero } from '../models/GustoGenero/gustoGenero';

@Injectable({
  providedIn: 'root'
})
export class RestPersonaService {

  public urlPersona: string = "http://127.0.0.1:8000/api/personas";
  constructor(private http: HttpClient) { }

  public getPersonas(){
    return this.http.get<Persona>(this.urlPersona);
  }

  //Obtiene todos los usuarios de un API Rest
  public getUsers() {
    let url: string = "http://127.0.0.1:8000/api/personas";
    return this.http.get<PersonaResponse[]>(url).pipe(
      map((resp: PersonaResponse[]) => {
        return resp.map( persona => Persona.PersonasEnJSON(persona))
      })
    );
  }


   //Registra un usuario
  public addPersona(persona: Persona) {
    const url: string = "http://127.0.0.1:8000/api/registrar"
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    //console.log(this.http.post(url, persona, {headers: headers}).subscribe((data2) => console.log(data2)));
    return this.http.post(url, persona, {headers: headers});
  }

  //actualizamos una persona:
  public updatePersona(correo: string, tieneHijos: number, quiereHijos: number, tipoRelacion: string){
    const url: string = "http://127.0.0.1:8000/api/actualizarPersona";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      'correo': correo,
      'tieneHijos': tieneHijos,
      'quiereHijos': quiereHijos,
      'tipoRelacion': tipoRelacion
    };
    var datosString = JSON.stringify(datos);
    console.log(datos);
    return this.http.put(url, datosString, {headers: headers});
  }


   //Registra las preferencias de una persona
  public addPreferenciaPersona(prefPers: PreferenciaPersona) {
    const url: string = "http://127.0.0.1:8000/api/addPreferenciaPersona"
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    //console.log(this.http.post(url, persona, {headers: headers}).subscribe((data2) => console.log(data2)));
    return this.http.post(url, prefPers, {headers: headers});
  }


  //Registra el gusto de una persona:
  public addGustoGenero(gustoGenero: GustoGenero){
    const url: string = "http://127.0.0.1:8000/api/addGustoGenero"
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    //console.log(this.http.post(url, persona, {headers: headers}).subscribe((data2) => console.log(data2)));
    return this.http.post(url, gustoGenero, {headers: headers});
  }


  public iniciarSesion(correo: string, contraseña: string){
    let url: string = "http://127.0.0.1:8000/api/iniciarSesion";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      'correo': correo,
      'contraseña': contraseña,
    };
    var datosString = JSON.stringify(datos);
    return this.http.post(url, datosString, {headers: headers});
  }




  public traerSugerencias(correo: string){
    let url: string = "http://127.0.0.1:8000/api/sugerencias";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={correo:correo};
    return this.http.post(url, dato, {headers: headers});
  }


  public darLike(correo1: string, correo2:string){
    let url: string = "http://127.0.0.1:8000/api/darLike";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      'correo1': correo1,
      'correo2': correo2,
    };
    var datosString = JSON.stringify(datos);
    return this.http.post(url, datosString, {headers: headers});
  }


  public getAmigosConectados(correo:string){
    let url: string = "http://127.0.0.1:8000/api/amigosConectados";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={correo:correo};
    return this.http.post(url, dato, {headers: headers});
  }


  public buscarPersona(correo:string){
    let url: string = "http://127.0.0.1:8000/api/buscarPersona";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={correo:correo};
    return this.http.post(url, dato, {headers: headers});
  }


  public restaurarPassword(correo:string){
    let url: string = "http://127.0.0.1:8000/api/restaurarPassword";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={correo:correo};
    return this.http.post(url, dato, {headers: headers});
  }

  public cerrarSesion(correo:string){
    let url: string = "http://127.0.0.1:8000/api/cerrarSesion";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={correo:correo};
    return this.http.post(url, dato, {headers: headers});
  }
}
