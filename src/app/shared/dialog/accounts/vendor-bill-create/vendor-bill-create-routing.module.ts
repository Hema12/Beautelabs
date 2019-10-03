import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorBillCreateComponent } from './vendor-bill-create.component';


const routes: Routes = [
  {
    path:'',
    component: VendorBillCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorBillCreateRoutingModule { }
