import { GustoGeneroResponse } from "./gustoGeneroResponse";

export class GustoGenero {

  static GustoGeneroJSON(obj: GustoGeneroResponse) {
    return new GustoGenero(
      obj['correo'],
      obj['id_genero'],
    );
  }

  constructor(
    public correo: string,
    public id_genero: number,
    ){}
}
