import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderCreateModule } from 'src/app/shared/dialog/purchase/purchase-order-create/purchase-order-create.module';


@NgModule({
  declarations: [PurchaseOrderComponent],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    SharedModule,
    PurchaseOrderCreateModule
  ],
  exports: [
    PurchaseOrderComponent
  ]
})
export class PurchaseOrderModule { }
