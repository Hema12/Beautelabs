import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { BookingModule } from 'src/app/shared/dialog/booking/booking.module';


@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    BookingModule
  ],
  exports: [
    AppointmentComponent
  ]
})
export class AppointmentModule { }
