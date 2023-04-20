import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/sahared.module';
import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';



@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule
  ]
})
export class RequestModule { }
