import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrepaidCardRoutingModule } from './prepaid-card-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { PrepaidCardComponent } from './prepaid-card.component';


@NgModule({
  declarations: [PrepaidCardComponent],
  imports: [
    CommonModule,
    PrepaidCardRoutingModule,
    SharedModule
  ],
  exports: [
    PrepaidCardComponent
  ]
})
export class PrepaidCardModule { }
