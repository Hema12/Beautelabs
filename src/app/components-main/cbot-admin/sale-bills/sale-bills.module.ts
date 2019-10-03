import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleBillsRoutingModule } from './sale-bills-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { SaleBillsComponent } from './sale-bills.component';


@NgModule({
  declarations: [SaleBillsComponent],
  imports: [
    CommonModule,
    SaleBillsRoutingModule,
    SharedModule
  ],
  exports: [
    SaleBillsComponent
  ]
})
export class SaleBillsModule { }
