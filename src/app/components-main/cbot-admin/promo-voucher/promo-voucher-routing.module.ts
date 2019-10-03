import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromoVoucherComponent } from './promo-voucher.component';


const routes: Routes = [
  {
    path:'',
    component: PromoVoucherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoVoucherRoutingModule { }
