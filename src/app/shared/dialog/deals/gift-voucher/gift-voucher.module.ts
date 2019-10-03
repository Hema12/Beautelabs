import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftVoucherRoutingModule } from './gift-voucher-routing.module';
import { GiftVoucherComponent } from './gift-voucher.component';
import { SharedModule } from 'src/app/shared/module/module.module';


@NgModule({
  declarations: [GiftVoucherComponent],
  imports: [
    CommonModule,
    GiftVoucherRoutingModule,
    SharedModule
  ],
  exports: [
    GiftVoucherComponent
  ]
})
export class GiftVoucherModule { }
