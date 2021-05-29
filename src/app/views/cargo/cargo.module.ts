import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { CargoComponent } from './cargo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ CargoComponent ],
  imports: [
    CommonModule,
    CargoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CargoModule { }
