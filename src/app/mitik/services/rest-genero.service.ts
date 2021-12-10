import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../models/generos';
@Injectable({
  providedIn: 'root'
})
export class RestGeneroService {

  public urlGenero: string = "http://127.0.0.1:8000/api/generos";
  constructor(private http: HttpClient) { }

  public getGeneros(){
    return this.http.get<Genero>(this.urlGenero);
  }
}
