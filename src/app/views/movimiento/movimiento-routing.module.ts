import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoComponent } from './movimiento.component';

const routes: Routes = [
  {
    path: '',
    component: MovimientoComponent,
    data: {
      title: 'Movimiento'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientoRoutingModule { }
