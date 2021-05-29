import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlE = '/v1/usuario/auth';
  private urlBase = environment.url + this.urlE;

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  public getAuth( _user: string, _password: string ) {
    /*const body = {
      user: _user,
      password: _password,
    };*/

    const body = `user=${_user}&password=${_password}`;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post<any>(`${this.urlBase}`, body, options).toPromise();
  }
}
