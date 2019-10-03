import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryTransferComponent } from './inventory-transfer.component';


const routes: Routes = [
  {
    path:'',
    component: InventoryTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryTransferRoutingModule { }
