import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreLocationsRoutingModule } from './store-locations-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { StoreLocationsComponent } from './store-locations.component';
import { InventoryLocationModule } from 'src/app/shared/dialog/stock/inventory-location/inventory-location.module';


@NgModule({
  declarations: [StoreLocationsComponent],
  imports: [
    CommonModule,
    StoreLocationsRoutingModule,
    SharedModule,
    InventoryLocationModule
  ],
  exports: [
    StoreLocationsComponent
  ]
})
export class StoreLocationsModule { }
