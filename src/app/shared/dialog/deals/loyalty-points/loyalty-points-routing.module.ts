import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyComponent } from 'src/app/components-main/cbot-admin/loyalty/loyalty.component';


const routes: Routes = [
  {
    path:'',
    component: LoyaltyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyPointsRoutingModule { }
