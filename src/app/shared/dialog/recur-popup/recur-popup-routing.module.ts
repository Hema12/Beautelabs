import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecurPopupComponent } from './recur-popup.component';


const routes: Routes = [
  {
    path:'',
    component: RecurPopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurPopupRoutingModule { }
