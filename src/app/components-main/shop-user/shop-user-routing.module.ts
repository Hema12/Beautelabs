import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopUserComponent } from './shop-user.component';


const routes: Routes = [
  {
    path:'',
    component:ShopUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopUserRoutingModule { }
