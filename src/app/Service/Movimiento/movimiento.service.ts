import { Movimiento } from "./../../Model/Movimiento/movimoento";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class MovimientoService {
  private urlE = "/v1/movimientos";
  private urlBase = environment.url + this.urlE;
  private header;

  constructor(private httpClient: HttpClient) {
    this.header = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", sessionStorage.getItem("token")),
    };
  }

  getAll() {
    return this.httpClient.get<Movimiento[]>(
      `${this.urlBase}/getAll`,
      this.header
    );
  }

  save(form: Movimiento) {
    const body: JSON = <JSON>(<unknown>{
      cantidadreal: +form.cantidadreal,
      cantidadanterior: +form.cantidadanterior,
      fehca: form.fecha,
      hora: form.hora,
      producto: form.producto,
      usuario: form.usuario,
    });
    console.log("**Movimeintos")
    console.log(body);
    return this.httpClient
      .post<Movimiento>(`${this.urlBase}/guardar`, body, this.header)
      .toPromise();
  }
}
