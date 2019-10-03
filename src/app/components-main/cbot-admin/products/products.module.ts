import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { ProductModule } from 'src/app/shared/dialog/product/product.module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ProductModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
