import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderCreateComponent } from './purchase-order-create.component';


const routes: Routes = [
  {
    path:'',
    component: PurchaseOrderCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderCreateRoutingModule { }
