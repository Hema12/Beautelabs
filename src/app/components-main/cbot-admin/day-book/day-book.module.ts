import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayBookRoutingModule } from './day-book-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { DayBookComponent } from './day-book.component';


@NgModule({
  declarations: [DayBookComponent],
  imports: [
    CommonModule,
    DayBookRoutingModule,
    SharedModule
  ],
  exports: [
    DayBookComponent
  ]
})
export class DayBookModule { }
