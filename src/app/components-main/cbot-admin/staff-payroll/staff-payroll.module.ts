import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffPayrollRoutingModule } from './staff-payroll-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { StaffPayrollComponent } from './staff-payroll.component';
import { PayrollModule } from 'src/app/shared/dialog/hr/payroll/payroll.module';


@NgModule({
  declarations: [StaffPayrollComponent],
  imports: [
    CommonModule,
    StaffPayrollRoutingModule,
    SharedModule,
    PayrollModule
  ],
  exports: [StaffPayrollComponent]
})
export class StaffPayrollModule { }
