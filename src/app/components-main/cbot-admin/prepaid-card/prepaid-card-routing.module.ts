import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrepaidCardComponent } from './prepaid-card.component';


const routes: Routes = [
  {
    path:'',
    component: PrepaidCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepaidCardRoutingModule { }
