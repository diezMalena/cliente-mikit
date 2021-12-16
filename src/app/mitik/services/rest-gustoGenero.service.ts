import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GustoGeneroResponse } from '../models/GustoGenero/gustoGeneroResponse';
import { GustoGenero } from '../models/GustoGenero/gustoGenero';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestGustoGeneroService {

  public urlGustoGenero: string = "http://127.0.0.1:8000/api/gustoGenero";
  constructor(private http: HttpClient) { }

  /*public getGustoGenero(){
    return this.http.get<GustoGenero>(this.urlGustoGenero);
  }*/

  public getGustoGenero() {
    let url: string = "http://127.0.0.1:8000/api/personas";
    return this.http.get<GustoGeneroResponse[]>(url).pipe(
      map((resp: GustoGeneroResponse[]) => {
        return resp.map( gustoGenero => GustoGenero.GustoGeneroJSON(gustoGenero))
      })
    );
  }
}
