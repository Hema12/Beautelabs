import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleBillCreateRoutingModule } from './sale-bill-create-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { SaleBillCreateComponent } from './sale-bill-create.component';


@NgModule({
  declarations: [SaleBillCreateComponent],
  imports: [
    CommonModule,
    SaleBillCreateRoutingModule,
    SharedModule
  ],
  exports: [
    SaleBillCreateComponent
  ]
})
export class SaleBillCreateModule { }
