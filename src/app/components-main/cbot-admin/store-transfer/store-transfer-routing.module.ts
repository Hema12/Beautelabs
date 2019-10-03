import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreTransferComponent } from './store-transfer.component';


const routes: Routes = [
  {
    path:'',
    component: StoreTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTransferRoutingModule { }
