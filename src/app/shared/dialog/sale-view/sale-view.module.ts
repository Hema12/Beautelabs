import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleViewRoutingModule } from './sale-view-routing.module';
import { SharedModule } from '../../module/module.module';
import { SaleViewComponent } from './sale-view.component';


@NgModule({
  declarations: [SaleViewComponent],
  imports: [
    CommonModule,
    SaleViewRoutingModule,
    SharedModule
  ],
  exports: [
    SaleViewComponent
  ]
})
export class SaleViewModule { }
