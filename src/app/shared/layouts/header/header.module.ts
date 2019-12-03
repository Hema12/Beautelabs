import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { SharedModule } from '../../module/module.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    SidenavModule,
    NavbarModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
