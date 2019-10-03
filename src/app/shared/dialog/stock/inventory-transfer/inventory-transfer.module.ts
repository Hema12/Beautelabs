import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryTransferRoutingModule } from './inventory-transfer-routing.module';
import { SharedModule } from 'src/app/shared/module/module.module';
import { InventoryTransferComponent } from './inventory-transfer.component';


@NgModule({
  declarations: [InventoryTransferComponent],
  imports: [
    CommonModule,
    InventoryTransferRoutingModule,
    SharedModule
  ],
  exports: [
    InventoryTransferComponent
  ]
})
export class InventoryTransferModule { }
