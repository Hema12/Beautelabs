import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { SharedModule } from 'src/app/shared/module/module.module';


@NgModule({
  declarations: [PayrollComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    SharedModule
  ],
  exports: [
    PayrollComponent
  ]
})
export class PayrollModule { }
