import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { SharedModule } from 'src/app/shared/module/module.module';


@NgModule({
  declarations: [CampaignsComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    SharedModule
  ],
  exports: [
    CampaignsComponent
  ]
})
export class CampaignsModule { }
