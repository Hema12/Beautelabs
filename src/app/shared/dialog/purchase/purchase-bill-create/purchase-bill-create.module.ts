import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseBillCreateRoutingModule } from './purchase-bill-create-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PurchaseBillCreateComponent } from './purchase-bill-create.component';


@NgModule({
  declarations: [PurchaseBillCreateComponent],
  imports: [
    CommonModule,
    PurchaseBillCreateRoutingModule,
    SharedModule
  ],
  exports: [
    PurchaseBillCreateComponent
  ]
})
export class PurchaseBillCreateModule { }
