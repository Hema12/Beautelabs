import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopUserRoutingModule } from './shop-user-routing.module';
import { ShopUserComponent } from './shop-user.component';


@NgModule({
  declarations: [ShopUserComponent],
  imports: [
    CommonModule,
    ShopUserRoutingModule
  ]
})
export class ShopUserModule { }
