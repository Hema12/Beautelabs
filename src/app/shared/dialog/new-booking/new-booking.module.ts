import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBookingRoutingModule } from './new-booking-routing.module';
import { NewBookingComponent } from './new-booking.component';
import { SharedModule } from '../../module/module.module';
import { RecurPopupModule } from '../recur-popup/recur-popup.module';
import { BillingActivityModule } from '../billing-activity/billing-activity.module';
import { ServiceModule } from '../service/service.module';

@NgModule({
  declarations: [NewBookingComponent],
  imports: [
    CommonModule,
    NewBookingRoutingModule,
    SharedModule,
    RecurPopupModule,
    BillingActivityModule,
    ServiceModule
  ],
  exports: [
    NewBookingComponent
  ]  
})
export class NewBookingModule { }
