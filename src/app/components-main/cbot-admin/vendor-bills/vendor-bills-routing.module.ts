import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorBillsComponent } from './vendor-bills.component';


const routes: Routes = [
  {
    path:'',
    component: VendorBillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorBillsRoutingModule { }
