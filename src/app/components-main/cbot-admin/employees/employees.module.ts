import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { StaffModule } from 'src/app/shared/dialog/staff/staff.module';


@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    StaffModule
  ],
  exports: [
    EmployeesComponent
  ]
})
export class EmployeesModule { }
