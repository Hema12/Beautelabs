import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankCashRegisterRoutingModule } from './bank-cash-register-routing.module';
import { BankCashRegisterComponent } from './bank-cash-register.component';
import { SharedModule } from 'src/app/shared/module/module.module';


@NgModule({
  declarations: [BankCashRegisterComponent],
  imports: [
    CommonModule,
    BankCashRegisterRoutingModule,
    SharedModule
  ],
  exports: [
    BankCashRegisterComponent
  ]
})
export class BankCashRegisterModule { }
