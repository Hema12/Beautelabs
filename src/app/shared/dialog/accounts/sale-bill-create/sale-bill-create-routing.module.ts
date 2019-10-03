import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleBillCreateComponent } from './sale-bill-create.component';


const routes: Routes = [
  {
    path:'',
    component: SaleBillCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleBillCreateRoutingModule { }
