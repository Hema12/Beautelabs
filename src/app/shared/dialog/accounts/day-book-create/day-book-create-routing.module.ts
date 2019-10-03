import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayBookCreateComponent } from './day-book-create.component';


const routes: Routes = [
  {
    path:'',
    component: DayBookCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayBookCreateRoutingModule { }
