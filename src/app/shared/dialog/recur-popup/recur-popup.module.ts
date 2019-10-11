import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurPopupRoutingModule } from './recur-popup-routing.module';
import { SharedModule } from '../../module/module.module';
import { RecurPopupComponent } from './recur-popup.component';


@NgModule({
  declarations: [RecurPopupComponent],
  imports: [
    CommonModule,
    RecurPopupRoutingModule,
    SharedModule
  ],
  exports: [
    RecurPopupComponent
  ]
})
export class RecurPopupModule { }
