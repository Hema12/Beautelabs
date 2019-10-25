import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleViewComponent } from './sale-view.component';


const routes: Routes = [
  {
    path:'',
    component: SaleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleViewRoutingModule { }
