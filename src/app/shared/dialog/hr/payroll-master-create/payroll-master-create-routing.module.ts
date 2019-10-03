import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollMasterCreateComponent } from './payroll-master-create.component';


const routes: Routes = [
  {
    path:'',
    component: PayrollMasterCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollMasterCreateRoutingModule { }
