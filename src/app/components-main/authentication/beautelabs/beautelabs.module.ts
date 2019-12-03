import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeautelabsRoutingModule } from './beautelabs-routing.module';
import { BeautelabsComponent } from './beautelabs.component';

import { HeaderModule } from 'src/app/shared/layouts/header/header.module';
import { SidenavModule } from 'src/app/shared/layouts/sidenav/sidenav.module';
import { FooterModule } from 'src/app/shared/layouts/footer/footer.module';
import { NavbarModule } from 'src/app/shared/layouts/navbar/navbar.module';
import { MatProgressBarModule } from '@angular/material';
import { SidebarModule } from 'src/app/shared/layouts/sidebar/sidebar.module';
import { share } from 'rxjs/operators';

@NgModule({
  declarations: [BeautelabsComponent],
  imports: [
    CommonModule,
    BeautelabsRoutingModule,
    HeaderModule,
    SidenavModule,
    FooterModule,
    NavbarModule,
    SidebarModule,
    MatProgressBarModule
  ]
})
export class BeautelabsModule { }
