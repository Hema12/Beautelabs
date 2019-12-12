import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SharedModule } from '../../module/module.module';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    NavbarModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
