import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MercanciaComponent } from './mercancia.component';

const routes: Routes = [
  {
    path: '',
    component: MercanciaComponent,
    data: {
      title: 'Mercancia'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercanciaRoutingModule { }
