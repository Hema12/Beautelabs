import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: "full",
  },
  {
    path: 'login',
    loadChildren: () => import('./components-main/authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'forget',
    loadChildren: () => import('./components-main/authentication/forget/forget.module').then(m => m.ForgetModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./components-main/authentication/signup/signup.module').then(m => m.SignupModule),
  },
  {
    path: 'beautelabs',
    loadChildren: () => import('./components-main/authentication/beautelabs/beautelabs.module').then(m => m.BeautelabsModule),
    // canActivate:[AuthGuard],
  },
  {
    path: '**',
    // redirectTo: '/login',
    loadChildren: () => import('./shared/not-found/not-found.module').then(m => m.NotFoundModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
