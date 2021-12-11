import { PreferenciaPersonaResponse } from "./preferenciaPersonaResponse";

export class PreferenciaPersona {

  static PreferenciaPersonaJSON(obj: PreferenciaPersonaResponse) {
    return new PreferenciaPersona(
      obj['correo'],
      obj['id_preferencia'],
      obj['intensidad'],
    );
  }

  constructor(
    public correo: string,
    public id_preferencia: number,
    public intensidad: number,
    ){}
}
