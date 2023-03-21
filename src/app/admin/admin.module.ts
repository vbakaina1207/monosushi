import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/sahared.module';
import { AdminProductTypeComponent } from './admin-product-type/admin-product-type.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminOrdersComponent,
    AdminProductTypeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
