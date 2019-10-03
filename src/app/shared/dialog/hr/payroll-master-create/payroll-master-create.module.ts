import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollMasterCreateRoutingModule } from './payroll-master-create-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PayrollMasterCreateComponent } from './payroll-master-create.component';


@NgModule({
  declarations: [PayrollMasterCreateComponent],
  imports: [
    CommonModule,
    PayrollMasterCreateRoutingModule,
    SharedModule
  ],
  exports: [
    PayrollMasterCreateComponent
  ]
})
export class PayrollMasterCreateModule { }
