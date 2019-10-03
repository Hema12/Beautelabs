import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorBillCreateRoutingModule } from './vendor-bill-create-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { VendorBillCreateComponent } from './vendor-bill-create.component';


@NgModule({
  declarations: [VendorBillCreateComponent],
  imports: [
    CommonModule,
    VendorBillCreateRoutingModule,
    SharedModule
  ],
  exports: [
    VendorBillCreateComponent
  ]
})
export class VendorBillCreateModule { }
