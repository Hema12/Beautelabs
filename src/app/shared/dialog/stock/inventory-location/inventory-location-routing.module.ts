import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryLocationComponent } from './inventory-location.component';


const routes: Routes = [
  {
    path:'',
    component: InventoryLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryLocationRoutingModule { }
