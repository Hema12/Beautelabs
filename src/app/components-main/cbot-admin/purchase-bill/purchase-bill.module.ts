import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseBillRoutingModule } from './purchase-bill-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PurchaseBillComponent } from './purchase-bill.component';
import { PurchaseBillCreateModule } from 'src/app/shared/dialog/purchase/purchase-bill-create/purchase-bill-create.module';


@NgModule({
  declarations: [PurchaseBillComponent],
  imports: [
    CommonModule,
    PurchaseBillRoutingModule,
    SharedModule,
    PurchaseBillCreateModule
  ],
  exports: [
    PurchaseBillComponent
  ]
})
export class PurchaseBillModule { }
