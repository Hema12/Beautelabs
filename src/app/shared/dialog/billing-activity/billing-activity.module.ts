import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingActivityRoutingModule } from './billing-activity-routing.module';
import { SharedModule } from '../../module/module.module';
import { BillingActivityComponent } from './billing-activity.component';


@NgModule({
  declarations: [BillingActivityComponent],
  imports: [
    CommonModule,
    BillingActivityRoutingModule,
    SharedModule
  ],
  exports: [
    BillingActivityComponent
  ]
})
export class BillingActivityModule { }
