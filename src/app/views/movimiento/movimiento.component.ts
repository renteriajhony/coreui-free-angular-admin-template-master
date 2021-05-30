import { MovimientoService } from './../../Service/Movimiento/movimiento.service';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Movimiento, MovimientoRender } from '../../Model/Movimiento/movimoento';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})

export class MovimientoComponent implements OnInit, AfterViewInit {


  dataSourceTwo: MatTableDataSource<MovimientoRender>;
  displayedColumnsTwo: string[] = ['codigo', 'producto', 'cantidadreal', 'cantidadanterior', 'fecha', 'hora', 'usuario'];
  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort;

  constructor(public movser: MovimientoService) {
    this.dataSourceTwo = new MatTableDataSource;
   }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.movser.getAll().subscribe( (resp) =>{
      console.log(resp);
      const datos = new Array();
      const respuesta: any = resp;
      respuesta.forEach(element => {
        const mr = new MovimientoRender();
        mr.codigo = element.codigo;
        mr.cantidadreal = element.cantidadreal;
        mr.cantidadanterior = element.cantidadanterior;
        mr.fecha = element.fehca;
        mr.hora = element.hora;
        mr.producto = element.producto.nombre;
        mr.usuario = element.usuario.nombre + " " + element.usuario.apellido;
        datos.push(mr);
      });


      this.dataSourceTwo.data = datos;
      this.dataSourceTwo.paginator = this.tableTwoPaginator;
      this.dataSourceTwo.sort = this.tableTwoSort;
    });
  }

  applyFilter(filterValue: string) {
    console.log(this.dataSourceTwo.data);
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
  }

}
