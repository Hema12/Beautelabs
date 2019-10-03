import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyPointsRoutingModule } from './loyalty-points-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { LoyaltyPointsComponent } from './loyalty-points.component';


@NgModule({
  declarations: [LoyaltyPointsComponent],
  imports: [
    CommonModule,
    LoyaltyPointsRoutingModule,
    SharedModule
  ],
  exports: [
    LoyaltyPointsComponent
  ]
})
export class LoyaltyPointsModule { }
