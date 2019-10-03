import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftVoucherComponent } from './gift-voucher.component';


const routes: Routes = [
  {
    path:'',
    component: GiftVoucherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftVoucherRoutingModule { }
