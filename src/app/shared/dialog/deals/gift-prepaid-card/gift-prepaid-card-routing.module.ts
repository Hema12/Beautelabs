import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftPrepaidCardComponent } from './gift-prepaid-card.component';


const routes: Routes = [
  {
    path:'',
    component: GiftPrepaidCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftPrepaidCardRoutingModule { }
