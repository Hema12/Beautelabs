import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';

import { SharedModule } from '../../module/module.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
