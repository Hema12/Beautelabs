import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopAdminRoutingModule } from './shop-admin-routing.module';
import { ShopAdminComponent } from './shop-admin.component';


@NgModule({
  declarations: [ShopAdminComponent],
  imports: [
    CommonModule,
    ShopAdminRoutingModule
  ]
})
export class ShopAdminModule { }
