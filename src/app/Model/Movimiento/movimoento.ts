import { Mercancia } from "../Mercancia/mercancia";
import { Usuario } from "../Usuario/usuario";

export class Movimiento {
  public codgo: Number;
  public cantidadreal: Number;
  public cantidadanterior: Number;
  public fecha: String;
  public hora: String;
  public producto: any;
  public usuario: Usuario;

  constructor() {}
}

export class MovimientoRender {
  public codigo: Number;
  public cantidadreal: Number;
  public cantidadanterior: Number;
  public fecha: String;
  public hora: String;
  public producto: String;
  public usuario: String;

  constructor() {}
}


