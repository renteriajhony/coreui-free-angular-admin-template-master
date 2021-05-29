import { CargoService } from './../../Service/Cargo/cargo.service';
import { UsuarioService } from './../../Service/Usuario/usuario.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../Model/Usuario/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  isUpdate: boolean = false;
  label_accion: string = 'Guardar';
  cargoList: any;
  usuarioList: any;
  constructor(public ususer: UsuarioService, public carser:CargoService) {
  }

  usuarioForm = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    fechaIngresoCompania: new FormControl(''),
    nickname: new FormControl(''),
    password: new FormControl(''),
    cargo: new FormControl('')
  });


  ngAfterViewInit(): void {
    this.getAllCargo();
    this.ngViewGetAll();
  }

  ngOnInit(): void {
  }

  getAllCargo() {
    this.carser.getAll().subscribe((result) => {
      console.log(result);
      this.cargoList =  result;
    });
  }

  ngViewGetAll() {
    this.ususer.getAll().subscribe((result) => {
      console.log(result);
      this.usuarioList =  result;
    });
  }

  ngViewAccion() {
    if (this.isUpdate) {
      this.ngViewUpdate();
    } else {
      this.ngViewSave();
    }
  }

  ngViewSave() {
    this.ususer.save(this.usuarioForm).then((result) => {
      this.ngViewReset();
      this.ngViewGetAll();
    });
  }
  ngViewToEdit(item){
    this.isUpdate = true;
    this.changeStatusEditTextForm();
    this.usuarioForm.controls.codigo.setValue(item.codigo);
    this.usuarioForm.controls.nombre.setValue(item.nombre);
    this.usuarioForm.controls.apellido.setValue(item.apellido);
    this.usuarioForm.controls.fechaNacimiento.setValue(item.fechaNacimiento);
    this.usuarioForm.controls.fechaIngresoCompania.setValue(item.fechaIngresoCompania);
    this.usuarioForm.controls.nickname.setValue(item.nickname);
    this.usuarioForm.controls.password.setValue(item.password);
    this.usuarioForm.controls.cargo.setValue(item.cargo.codigo);
    console.log(this.usuarioForm);
  }

  ngViewUpdate() {
    this.ususer.update(this.usuarioForm).then((result) => {
      this.ngViewReset();
      this.ngViewGetAll();
    });
  }

  ngViewReset() {
    this.isUpdate = false;
    this.changeStatusEditTextForm();
    this. usuarioForm = new FormGroup({
      codigo: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      fechaIngresoCompania: new FormControl(''),
      nickname: new FormControl(''),
      password: new FormControl(''),
      cargo: new FormControl('')
    });
  }

  changeStatusEditTextForm(){
    if(this.isUpdate){
      this.label_accion = "Actualizar";
      this.usuarioForm.controls.codigo.disable();
    }else{
      this.label_accion = "Guardar";
      this.usuarioForm.controls.codigo.enable();
    }
  }

}
