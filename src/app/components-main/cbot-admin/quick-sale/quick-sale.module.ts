import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickSaleRoutingModule } from './quick-sale-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { QuickSaleComponent } from './quick-sale.component';


@NgModule({
  declarations: [QuickSaleComponent],
  imports: [
    CommonModule,
    QuickSaleRoutingModule,
    SharedModule
  ],
  exports: [
    QuickSaleComponent
  ]
})
export class QuickSaleModule { }
