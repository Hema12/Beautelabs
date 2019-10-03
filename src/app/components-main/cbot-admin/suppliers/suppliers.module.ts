import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { SupplierModule } from 'src/app/shared/dialog/supplier/supplier.module';


@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    SharedModule,
    SupplierModule
  ],
  exports: [
    SuppliersComponent
  ]
})
export class SuppliersModule { }
