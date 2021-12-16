export interface PersonaResponse {
  correo:          string;
  nombre:          string;
  contraseña:      string;
  fechaNacimiento: Date;
  ciudad:          string;
  descripcion:     string;
  tipoRelacion:    string;
  foto:            string;
  tieneHijos:      number;
  quiereHijos:     number;
  conectado:       number;
  activado:        number;
  tema:            number;
  id_genero:       number;
}
