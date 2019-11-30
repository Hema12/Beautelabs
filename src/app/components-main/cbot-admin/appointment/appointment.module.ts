import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { BookingModule } from 'src/app/shared/dialog/booking/booking.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DayViewSchedulerComponent } from './day-view-scheduler.component';


@NgModule({
  declarations: [AppointmentComponent, DayViewSchedulerComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    BookingModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot(),
  ],
  exports: [
    AppointmentComponent
  ]
})
export class AppointmentModule { }
