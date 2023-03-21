import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { SharedModule } from '../../shared/sahared.module';
import { DeliveryComponent } from './delivery.component';



@NgModule({
  declarations: [
    DeliveryComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule
  ]
})
export class DeliveryModule { }
