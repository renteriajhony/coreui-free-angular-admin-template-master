import { UsuarioService } from './../../Service/Usuario/usuario.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MercanciaService } from '../../Service/Mercancia/mercancia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrls: ['./mercancia.component.scss']
})
export class MercanciaComponent implements OnInit, AfterViewInit {

  isUpdate: boolean = false;
  label_accion: string = 'Guardar';
  mercanciaList: any;
  usuarioList: any;
  usuario_validate: any;

  constructor(public merser: MercanciaService, public ususer: UsuarioService, private toastr: ToastrService) {
    this.usuario_validate = JSON.parse(sessionStorage.getItem("usuario"));
   }

  mercanciaForm = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    cantidad: new FormControl(''),
    usuarioRegistra: new FormControl(''),
    fechaIngreso: new FormControl('')
  });

  ngAfterViewInit(): void {
    this.getAllUser();
    this.ngViewGetAll();
  }

  ngOnInit(): void {
  }

  getAllUser() {
    this.ususer.getAll().subscribe((result) => {
      console.log(result);
      this.usuarioList =  result;
    });
  }

  ngViewGetAll() {
    this.merser.getAll().subscribe((result) => {
      console.log(result);
      this.mercanciaList =  result;
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
    this.merser.save(this.mercanciaForm).then((result) => {
      this.ngViewReset();
      this.ngViewGetAll();
    });
  }
  ngViewToEdit(item) {
    if (this.usuario_validate.codigo === item.usuarioRegistra.codigo) {
        this.isUpdate = true;
        this.changeStatusEditTextForm();
        this.mercanciaForm.controls.codigo.setValue(item.codigo);
        this.mercanciaForm.controls.nombre.setValue(item.nombre);
        this.mercanciaForm.controls.cantidad.setValue(item.cantidad);
        this.mercanciaForm.controls.usuarioRegistra.setValue(item.usuarioRegistra.codigo);
        this.mercanciaForm.controls.fechaIngreso.setValue(item.fechaIngreso);
    } else {
      alert('Usuario no autorizado para editar esta mercancia');
      console.log(this.mercanciaForm);
      this.toastr.success('Hello world!', 'Toastr fun!');
    }

  }

  ngViewUpdate() {
    this.merser.update(this.mercanciaForm).then((result) => {
      this.ngViewReset();
      this.ngViewGetAll();
    });
  }

  ngViewReset() {
    this.isUpdate = false;
    this.changeStatusEditTextForm();
    this. mercanciaForm = new FormGroup({
      codigo: new FormControl(''),
      nombre: new FormControl(''),
      cantidad: new FormControl(''),
      usuarioRegistra: new FormControl(''),
      fechaIngreso: new FormControl('')
    });
  }

  changeStatusEditTextForm(){
    if(this.isUpdate){
      this.label_accion = "Actualizar";
      this.mercanciaForm.controls.codigo.disable();
    }else{
      this.label_accion = "Guardar";
      this.mercanciaForm.controls.codigo.enable();
    }
  }

}
