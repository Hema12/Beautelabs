import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterRoutingModule } from './cash-register-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { CashRegisterComponent } from './cash-register.component';


@NgModule({
  declarations: [CashRegisterComponent],
  imports: [
    CommonModule,
    CashRegisterRoutingModule,
    SharedModule
  ],
  exports: [
    CashRegisterComponent
  ]
})
export class CashRegisterModule { }
