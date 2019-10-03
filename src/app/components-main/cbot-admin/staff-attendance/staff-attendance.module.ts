import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffAttendanceRoutingModule } from './staff-attendance-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { StaffAttendanceComponent } from './staff-attendance.component';
import { AttendanceModule } from 'src/app/shared/dialog/hr/attendance/attendance.module';


@NgModule({
  declarations: [StaffAttendanceComponent],
  imports: [
    CommonModule,
    StaffAttendanceRoutingModule,
    SharedModule,
    AttendanceModule
  ],
  exports: [
    StaffAttendanceComponent
  ]
})
export class StaffAttendanceModule { }
