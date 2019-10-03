import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderCreateRoutingModule } from './purchase-order-create-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PurchaseOrderCreateComponent } from './purchase-order-create.component';


@NgModule({
  declarations: [PurchaseOrderCreateComponent],
  imports: [
    CommonModule,
    PurchaseOrderCreateRoutingModule,
    SharedModule
  ],
  exports: [
    PurchaseOrderCreateComponent
  ]
})
export class PurchaseOrderCreateModule { }
