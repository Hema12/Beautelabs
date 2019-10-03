import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffPayrollComponent } from './staff-payroll.component';


const routes: Routes = [
  {
    path:'',
    component: StaffPayrollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPayrollRoutingModule { }
