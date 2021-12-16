import { PersonaResponse } from "./persona-response";

export class Persona {

  static PersonasEnJSON(obj: PersonaResponse) {
    return new Persona(
      obj['correo'],
      obj['nombre'],
      obj['contraseña'],
      obj['fechaNacimiento'],
      obj['ciudad'],
      obj['descripcion'],
      obj['tipoRelacion'],
      obj['foto'],
      obj['tieneHijos'],
      obj['quiereHijos'],
      obj['conectado'],
      obj['activado'],
      obj['tema'],
      obj['id_genero']
    );
  }

  constructor(
    public correo: string,
    public nombre: string,
    public contraseña: string,
    public fechaNacimiento: Date,
    public ciudad: string,
    public descripcion: string,
    public tipoRelacion: string,
    public foto: string,
    public tieneHijos: number,
    public quiereHijos: number,
    public conectado: number,
    public activado: number,
    public tema: number,
    public id_genero: number
    ){}
}
