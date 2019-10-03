import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { SharedModule } from '../../module/module.module';


@NgModule({
  declarations: [SaleComponent],
  imports: [
    CommonModule,
    SaleRoutingModule,
    SharedModule
  ],
  exports : [
    SaleComponent
  ]
})
export class SaleModule { }
