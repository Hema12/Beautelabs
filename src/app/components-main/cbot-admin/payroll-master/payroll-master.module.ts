import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollMasterRoutingModule } from './payroll-master-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PayrollMasterComponent } from './payroll-master.component';
import { PayrollMasterCreateModule } from 'src/app/shared/dialog/hr/payroll-master-create/payroll-master-create.module';


@NgModule({
  declarations: [PayrollMasterComponent],
  imports: [
    CommonModule,
    PayrollMasterRoutingModule,
    SharedModule,
    PayrollMasterCreateModule
  ],
  exports: [
    PayrollMasterComponent
  ]
})
export class PayrollMasterModule { }
