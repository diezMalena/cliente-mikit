import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreferenciaPersonaResponse } from '../models/PreferenciaPersona/preferenciaPersonaResponse';
import { PreferenciaPersona } from '../models/PreferenciaPersona/preferenciaPersona';

@Injectable({
  providedIn: 'root'
})
export class RestPreferenciaPersonaService {

  public urlPreferenciaPersona: string = "http://127.0.0.1:8000/api/preferenciaPersona";
  constructor(private http: HttpClient) { }

  public getPreferenciaPersona(){
    return this.http.get<PreferenciaPersona>(this.urlPreferenciaPersona);
  }
}
