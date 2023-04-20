import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/sahared.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
