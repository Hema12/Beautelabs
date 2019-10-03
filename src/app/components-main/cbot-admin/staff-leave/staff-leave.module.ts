import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffLeaveRoutingModule } from './staff-leave-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { StaffLeaveComponent } from './staff-leave.component';
import { LeavesModule } from 'src/app/shared/dialog/hr/leaves/leaves.module';


@NgModule({
  declarations: [StaffLeaveComponent],
  imports: [
    CommonModule,
    StaffLeaveRoutingModule,
    SharedModule,
    LeavesModule
  ],
  exports: [
    StaffLeaveComponent
  ]
})
export class StaffLeaveModule { }
