import { MovimientoService } from "./../../Service/Movimiento/movimiento.service";
import { Movimiento } from "./../../Model/Movimiento/movimoento";
import { UsuarioService } from "./../../Service/Usuario/usuario.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MercanciaService } from "../../Service/Mercancia/mercancia.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-mercancia",
  templateUrl: "./mercancia.component.html",
  styleUrls: ["./mercancia.component.scss"],
})
export class MercanciaComponent implements OnInit, AfterViewInit {
  isUpdate: boolean = false;
  label_accion: string = "Guardar";
  mercanciaList: any;
  usuarioList: any;
  usuario_validate: any;
  movimiento: Movimiento;
  mercancia: any;

  constructor(
    public merser: MercanciaService,
    public ususer: UsuarioService,
    public movser: MovimientoService,
    public toastr: ToastrService,
    public miDatePipe: DatePipe
  ) {
    this.usuario_validate = JSON.parse(sessionStorage.getItem("usuario"));
    this.movimiento = new Movimiento();
  }

  mercanciaForm = new FormGroup({
    codigo: new FormControl(""),
    nombre: new FormControl(""),
    cantidad: new FormControl(""),
    usuarioRegistra: new FormControl(""),
    fechaIngreso: new FormControl(""),
  });

  ngAfterViewInit(): void {
    this.getAllUser();
    this.ngViewGetAll();
  }

  ngOnInit(): void {
    this.mercanciaForm.controls.usuarioRegistra.setValue(
      this.usuario_validate.codigo
    );
  }

  getAllUser() {
    this.ususer.getAll().subscribe((result) => {
      this.usuarioList = result;
    });
  }

  ngViewGetAll() {
    this.merser.getAll().subscribe((result) => {
      this.mercanciaList = result;
    });
  }

  ngViewAccion() {
    this.movimiento.cantidadreal = +this.mercanciaForm.controls.cantidad.value;
    if (this.isUpdate) {
      this.ngViewUpdate();
    } else {
      this.ngViewSave();
    }
  }

  ngViewSave() {
    this.setMovimientoSave();
    this.merser.getByName(this.mercanciaForm.controls.nombre.value).then(respValida =>{
      var mercancia: any = respValida;
     if (mercancia == null || mercancia == 'null') {

        this.merser.save(this.mercanciaForm).then((result) => {
          this.merser.getByName(this.mercanciaForm.controls.nombre.value).then(resp =>{
            this.movimiento.producto = resp;
            this.movser.save(this.movimiento);
          });
          this.ngViewReset();
          this.ngViewGetAll();
        });


      } else {
        alert('Este producto ya fue registrado');
        return false;
      }
    });
  }
  validaExisteProducto(value: any) {

    /*if (mercancia.cantidad == undefined || mercancia.cantidad == 'undefined') { return true;
    } else {
      alert('Este producto ya fue registrado');
      return false;
    }*/
    return false;
  }
  ngViewToEdit(item) {
    this.isUpdate = true;
    this.setMovimientoUpdate(item);
    this.changeStatusEditTextForm();
    this.mercanciaForm.controls.codigo.setValue(item.codigo);
    this.mercanciaForm.controls.nombre.setValue(item.nombre);
    this.mercanciaForm.controls.cantidad.setValue(item.cantidad);
    this.mercanciaForm.controls.usuarioRegistra.setValue(
      item.usuarioRegistra.codigo
    );
    this.mercanciaForm.controls.fechaIngreso.setValue(item.fechaIngreso);
  }

  ngViewDelete(item) {
    if (this.usuario_validate.codigo === item.usuarioRegistra.codigo) {
      this.merser.delete(item).then( () => {
        this.getAllUser();
      });
    } else {
      alert("Usuario no autorizado para eliminar esta mercancia");
      //this.toastr.success('Hello world!', 'Toastr fun!');
    }
  }

  ngViewUpdate() {
    this.merser.update(this.mercanciaForm).then((result) => {
      this.movser.save(this.movimiento);
      this.ngViewReset();
      this.ngViewGetAll();
    });
  }

  ngViewReset() {
    this.isUpdate = false;
    this.changeStatusEditTextForm();
    this.mercanciaForm = new FormGroup({
      codigo: new FormControl(""),
      nombre: new FormControl(""),
      cantidad: new FormControl(""),
      usuarioRegistra: new FormControl(""),
      fechaIngreso: new FormControl(""),
    });
  }

  changeStatusEditTextForm() {
    if (this.isUpdate) {
      this.label_accion = "Actualizar";
      this.mercanciaForm.controls.codigo.disable();
    } else {
      this.label_accion = "Guardar";
      this.mercanciaForm.controls.codigo.enable();
    }
  }

  setMovimientoUpdate(item) {
    this.movimiento.fecha = this.miDatePipe.transform(Date.now(), "yyyy-MM-dd");
    this.movimiento.hora = this.miDatePipe.transform(Date.now(), "HH:mm:ss");
    this.movimiento.cantidadanterior = +item.cantidad;
    this.movimiento.producto = item;
    this.movimiento.usuario = this.usuario_validate;
  }

  setMovimientoSave() {

    // Crea movimiento
    this.movimiento.cantidadreal = +this.mercanciaForm.controls.cantidad.value;
    this.movimiento.cantidadanterior =
      +this.mercanciaForm.controls.cantidad.value;
    // this.movimiento.producto = JSON.parse(JSON.stringify(this.mercancia));
    this.movimiento.usuario = this.usuario_validate;
    this.movimiento.fecha = this.miDatePipe.transform(Date.now(), "yyyy-MM-dd");
    this.movimiento.hora = this.miDatePipe.transform(Date.now(), "HH:mm:ss");
  }
}
