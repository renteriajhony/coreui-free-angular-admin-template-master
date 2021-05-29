import { Cargo } from "../Cargo/cargo";

export class Usuario {
  public codigo: Number;
  public nombre: String;
  public apellido: String;
  public fechaNacimiento: String;
  public fechaIngresoCompania: String;
  public nickname: String;
  public password: String;
  public cargo: Cargo;

  constructor() {}
}
