import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreTransferRoutingModule } from './store-transfer-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { StoreTransferComponent } from './store-transfer.component';
import { InventoryTransferModule } from 'src/app/shared/dialog/stock/inventory-transfer/inventory-transfer.module';


@NgModule({
  declarations: [StoreTransferComponent],
  imports: [
    CommonModule,
    StoreTransferRoutingModule,
    SharedModule,
    InventoryTransferModule
  ],
  exports: [
    StoreTransferComponent
  ]
})
export class StoreTransferModule { }
