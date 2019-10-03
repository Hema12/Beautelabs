import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreLocationsComponent } from './store-locations.component';


const routes: Routes = [
  {
    path:'',
    component: StoreLocationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreLocationsRoutingModule { }
