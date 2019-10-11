import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { SharedModule } from '../../module/module.module';
import { RecurPopupModule } from '../recur-popup/recur-popup.module';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    RecurPopupModule
  ],
  exports: [
    BookingComponent
  ]
})
export class BookingModule { }
