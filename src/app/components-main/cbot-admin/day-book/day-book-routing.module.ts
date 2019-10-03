import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayBookComponent } from './day-book.component';


const routes: Routes = [
  {
    path:'',
    component: DayBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayBookRoutingModule { }
