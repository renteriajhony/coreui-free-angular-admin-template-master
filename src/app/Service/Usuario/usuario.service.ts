import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../Model/Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlE = '/v1/usuario';
  private urlBase = environment.url + this.urlE;
  private header;

  constructor( private httpClient: HttpClient) {
    this.header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', sessionStorage.getItem("token"))
    };
   }

   getAll() {
    return this.httpClient.get<Usuario[]>(`${this.urlBase}/getAll`,  this.header);
  }

  update(form: FormGroup){
    const body:JSON = <JSON><unknown>{
      "codigo": form.controls.codigo.value,
      "nombre": form.controls.nombre.value,
      "apellido": form.controls.apellido.value,
      "fechaNacimiento": form.controls.fechaNacimiento.value,
      "fechaIngresoCompania": form.controls.fechaIngresoCompania.value,
      "nickname": form.controls.nickname.value,
      "password": form.controls.password.value,
      "cargo": +form.controls.cargo.value
    };
    console.log(body);
    return this.httpClient.put<Usuario>(`${this.urlBase}/update`, body, this.header).toPromise();
  }

  save(form: FormGroup){
    const body:JSON = <JSON><unknown>{
      "nombre": form.controls.nombre.value,
      "apellido": form.controls.apellido.value,
      "fechaNacimiento": form.controls.fechaNacimiento.value,
      "fechaIngresoCompania": form.controls.fechaIngresoCompania.value,
      "nickname": form.controls.nickname.value,
      "password": form.controls.password.value,
      "cargo": +form.controls.cargo.value
    };
    console.log(body);
    return this.httpClient.post<any>(`${this.urlBase}/guardar`, body, this.header).toPromise();
  }

}
