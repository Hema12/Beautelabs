import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSaleComponent } from './quick-sale.component';


const routes: Routes = [
  {
    path:'',
    component: QuickSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickSaleRoutingModule { }
