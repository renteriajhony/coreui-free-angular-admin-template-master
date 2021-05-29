import { CargoService } from './../../Service/Cargo/cargo.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit, AfterViewInit {
  isUpdate: boolean = false;
  label_accion: string = 'Guardar';
  cargosList: any;

  constructor(
    private cargoService: CargoService
  ) { }

  cargoForm = new FormGroup({
    codigo: new FormControl(""),
    nombre: new FormControl(""),
  });

  ngAfterViewInit(): void {
    this.ngViewGetAll();
  }

  ngOnInit(): void {
  }

  ngViewGetAll(){
    this.cargoService.getAll().subscribe((result) => {
      this.cargosList = result;
    });
  }

  ngViewAccion(){
    if(this.isUpdate){
      this.ngViewUpdate();
    }else{
      this.ngViewSave();
    }
  }

  ngViewSave(){
    this.cargoService.save(this.cargoForm).then((result) => {
      this.ngViewReset();
      this.ngViewGetAll();
    });
  }
  ngViewToEdit(item){
    this.isUpdate = true;
    this.changeStatusEditTextForm();
    this.cargoForm.controls.codigo.setValue(item.codigo);
    this.cargoForm.controls.nombre.setValue(item.nombre);
  }

  ngViewUpdate(){
    this.cargoService.update(this.cargoForm).then((result) => {
      this.ngViewReset();
      this.ngViewGetAll();
    });
  }

  ngViewReset(){
    this.isUpdate = false;
    this.changeStatusEditTextForm();
    this. cargoForm = new FormGroup({
      codigo: new FormControl(""),
      nombre: new FormControl(""),
    });
  }

  changeStatusEditTextForm(){
    if(this.isUpdate){
      this.label_accion = "Actualizar";
      this.cargoForm.controls.codigo.disable();
    }else{
      this.label_accion = "Guardar";
      this.cargoForm.controls.codigo.enable();
    }
  }

}
