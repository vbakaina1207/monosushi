import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './shared/guards/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'discount',
    loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule)
  },
  {
    path: 'product/:category/:type_product',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'delivery',
    loadChildren: () => import('./pages/delivery/delivery.module').then(m => m.DeliveryModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'offerta',
    loadChildren: () => import('./pages/offerta/offerta.module').then(m => m.OffertaModule)
  },
  {
    path: 'connection',
    loadChildren: () => import('./pages/connection/connection.module').then(m => m.ConnectionModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
