import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerViewRoutingModule } from './customer-view-routing.module';
import { SharedModule } from '../../module/module.module';
import { CustomerViewComponent } from './customer-view.component';


@NgModule({
  declarations: [CustomerViewComponent],
  imports: [
    CommonModule,
    CustomerViewRoutingModule,
    SharedModule
  ],
  exports: [
    CustomerViewComponent
  ]
})
export class CustomerViewModule { }
