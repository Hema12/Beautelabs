import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetRoutingModule } from './forget-routing.module';
import { ForgetComponent } from './forget.component';
import { SharedModule } from 'src/app/shared/module/module.module';


@NgModule({
  declarations: [ForgetComponent],
  imports: [
    CommonModule,
    ForgetRoutingModule,
    SharedModule
  ]
})
export class ForgetModule { }
