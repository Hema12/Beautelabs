import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../../module/module.module';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    SelectAutocompleteModule
  ],
  exports: [
    CustomerComponent
  ]
})
export class CustomerModule { }
