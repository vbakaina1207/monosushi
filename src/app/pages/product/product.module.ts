import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/sahared.module';
import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './product-info/product-info.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductInfoComponent
  ],
  exports: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
