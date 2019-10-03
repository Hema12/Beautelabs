import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftPrepaidCardRoutingModule } from './gift-prepaid-card-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { GiftPrepaidCardComponent } from './gift-prepaid-card.component';


@NgModule({
  declarations: [GiftPrepaidCardComponent],
  imports: [
    CommonModule,
    GiftPrepaidCardRoutingModule,
    SharedModule
  ],
  exports: [
    GiftPrepaidCardComponent
  ]
})
export class GiftPrepaidCardModule { }
