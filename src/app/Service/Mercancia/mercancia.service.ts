import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Mercancia } from '../../Model/Mercancia/mercancia';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {
  private urlE = '/v1/producto';
  private urlBase = environment.url + this.urlE;
  private header;

  constructor(private httpClient: HttpClient) {
    this.header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', sessionStorage.getItem("token"))
    };
  }

  getAll() {
    return this.httpClient.get<Mercancia[]>(`${this.urlBase}/getAll`,  this.header);
  }

  update(form: FormGroup) {
    const body: JSON = <JSON><unknown>{
      "codigo": form.controls.codigo.value,
      "nombre": form.controls.nombre.value,
      "cantidad": +form.controls.cantidad.value,
      "usuarioRegistra": +form.controls.usuarioRegistra.value,
      "fechaIngreso": form.controls.fechaIngreso.value
    };
    console.log(body);
    return this.httpClient.put<Mercancia>(`${this.urlBase}/update`, body, this.header).toPromise();
  }

  save(form: FormGroup) {
    const body: JSON = <JSON><unknown>{
      "nombre": form.controls.nombre.value,
      "cantidad": form.controls.cantidad.value,
      "usuarioRegistra": +form.controls.usuarioRegistra.value,
      "fechaIngreso": form.controls.fechaIngreso.value
    };
    console.log(body);
    return this.httpClient.post<any>(`${this.urlBase}/guardar`, body, this.header).toPromise();
  }
}
