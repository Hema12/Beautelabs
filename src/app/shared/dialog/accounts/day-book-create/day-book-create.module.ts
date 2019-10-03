import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayBookCreateRoutingModule } from './day-book-create-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { DayBookCreateComponent } from './day-book-create.component';


@NgModule({
  declarations: [DayBookCreateComponent],
  imports: [
    CommonModule,
    DayBookCreateRoutingModule,
    SharedModule
  ],
  exports: [
    DayBookCreateComponent
  ]
})
export class DayBookCreateModule { }
