import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../Model/auth';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private _service: AuthService, private router: Router) {

  }

  auth: Auth;

  authForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  createFormGroup() {
    return new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  onResetForm() {
    this.authForm.reset();
  }

  onSaveForm() {
   this._service
      .getAuth(
        this.authForm.controls.email.value,
        this.authForm.controls.password.value
      )
      .then((response) => {
        if (response.status === 202) {
          sessionStorage.setItem("token", response.entity.token);
          sessionStorage.setItem("usuario", JSON.stringify(response.entity.usuario));
          this.router.navigate(["dashboard"]);
          return true;
        } else {
          /*this.toastr.error('Usuario o contraseña incorrectos', 'Autenticacion', {
            timeOut: 3000,
          });*/
          localStorage.removeItem("token");
          return false;
        }
      });
  }

 }
