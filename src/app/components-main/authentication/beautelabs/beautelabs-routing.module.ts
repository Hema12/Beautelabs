import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeautelabsComponent } from './beautelabs.component';


const routes: Routes = [
  {
    path: '',
    component: BeautelabsComponent,
    children: [
      {
        path: 'cbot-admin',
        loadChildren: () => import('../../cbot-admin/cbot-admin.module').then(m => m.CbotAdminModule),
      },
      {
        path: 'shop-admin',
        loadChildren: () => import('../../shop-admin/shop-admin.module').then(m => m.ShopAdminModule),
      },
      {
        path: 'shop-user',
        loadChildren: () => import('../../shop-user/shop-user.module').then(m => m.ShopUserModule),
      }
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeautelabsRoutingModule { }
