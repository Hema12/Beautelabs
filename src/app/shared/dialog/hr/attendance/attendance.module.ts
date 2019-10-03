import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { SharedModule } from 'src/app/shared/module/module.module';


@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule
  ],
  exports: [
    AttendanceComponent
  ]
})
export class AttendanceModule { }
