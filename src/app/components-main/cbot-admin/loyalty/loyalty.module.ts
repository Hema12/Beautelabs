import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { LoyaltyComponent } from './loyalty.component';
import { SharedModule } from 'src/app/shared/module/module.module';


@NgModule({
  declarations: [LoyaltyComponent],
  imports: [
    CommonModule,
    LoyaltyRoutingModule,
    SharedModule
  ],
  exports: [
    LoyaltyComponent
  ]
})
export class LoyaltyModule { }
