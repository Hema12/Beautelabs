import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeautelabsRoutingModule } from './beautelabs-routing.module';
import { BeautelabsComponent } from './beautelabs.component';

import { HeaderModule } from 'src/app/shared/layouts/header/header.module';
import { SidenavModule } from 'src/app/shared/layouts/sidenav/sidenav.module';
import { FooterModule } from 'src/app/shared/layouts/footer/footer.module';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [BeautelabsComponent],
  imports: [
    CommonModule,
    BeautelabsRoutingModule,
    HeaderModule,
    SidenavModule,
    FooterModule,
    MatProgressBarModule
  ]
})
export class BeautelabsModule { }
