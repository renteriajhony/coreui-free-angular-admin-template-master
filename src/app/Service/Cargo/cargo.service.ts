import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cargo } from '../../Model/Cargo/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private urlE= '/v1/cargo';
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
    return this.httpClient.get<Cargo[]>(`${this.urlBase}/getAll`,  this.header);
  }

  update(form: FormGroup){
    const body:JSON = <JSON><unknown>{
      "codigo":form.controls.codigo.value,
      "nombre":form.controls.nombre.value
    };
    console.log(body);
    return this.httpClient.put<Cargo>(`${this.urlBase}/update`, body, this.header).toPromise();
  }

  save(form: FormGroup){
    const body:JSON = <JSON><unknown>{
      "nombre":form.controls.nombre.value
    };
    console.log(body);
    return this.httpClient.post<any>(`${this.urlBase}/guardar`, body, this.header).toPromise();
  }
}
