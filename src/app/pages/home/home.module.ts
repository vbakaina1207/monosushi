import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/sahared.module';
import { HomeComponent } from './home.component';
// import { ProductModule } from "../product/product.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    // ProductModule
  ]
})
export class HomeModule { }
