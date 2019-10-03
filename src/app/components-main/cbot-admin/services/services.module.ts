import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { ServiceModule } from 'src/app/shared/dialog/service/service.module';


@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    ServiceModule
  ],
  exports: [
    ServicesComponent
  ]
})
export class ServicesModule { }
