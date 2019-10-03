import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryLocationRoutingModule } from './inventory-location-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { InventoryLocationComponent } from './inventory-location.component';


@NgModule({
  declarations: [InventoryLocationComponent],
  imports: [
    CommonModule,
    InventoryLocationRoutingModule,
    SharedModule
  ],
  exports: [
    InventoryLocationComponent
  ]
})
export class InventoryLocationModule { }
