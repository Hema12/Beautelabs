import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopAdminComponent } from './shop-admin.component';


const routes: Routes = [
  {
    path:'',
    component:ShopAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopAdminRoutingModule { }
