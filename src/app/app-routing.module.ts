import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductTypeComponent } from './admin/admin-product-type/admin-product-type.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { DiscountComponent } from './pages/discount/discount.component'; 
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductTypeComponent } from './pages/product-type/product-type.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount/:id', component: DiscountInfoComponent,
  resolve: {
    discountInfo: DiscountInfoResolver
  } },
  { path: 'product/:category/:type_product', component: ProductComponent },
  { path: 'product/:category/:type_product/:id', component: ProductInfoComponent, 
  resolve: {
    productInfo: ProductInfoResolver
  } },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'offerta', component: OffertaComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product-type', component: AdminProductTypeComponent},
    { path: 'product', component: AdminProductComponent },
    { path: 'discount', component: AdminDiscountComponent },
    { path: 'order', component: AdminOrdersComponent },
    { path: '', pathMatch: 'full', redirectTo: 'discount' }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
