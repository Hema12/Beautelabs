import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoVoucherRoutingModule } from './promo-voucher-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PromoVoucherComponent } from './promo-voucher.component';


@NgModule({
  declarations: [PromoVoucherComponent],
  imports: [
    CommonModule,
    PromoVoucherRoutingModule,
    SharedModule
  ],
  exports:[
    PromoVoucherComponent
  ]
})
export class PromoVoucherModule { }
