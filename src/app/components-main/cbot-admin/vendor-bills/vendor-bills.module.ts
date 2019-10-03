import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorBillsRoutingModule } from './vendor-bills-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { VendorBillsComponent } from './vendor-bills.component';


@NgModule({
  declarations: [VendorBillsComponent],
  imports: [
    CommonModule,
    VendorBillsRoutingModule,
    SharedModule
  ],
  exports: [
    VendorBillsComponent
  ]
})
export class VendorBillsModule { }
