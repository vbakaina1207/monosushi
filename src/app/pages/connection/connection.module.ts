import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionRoutingModule } from './connection-routing.module';
import { SharedModule } from '../../shared/sahared.module';
import { ConnectionComponent } from './connection.component';



@NgModule({
  declarations: [
    ConnectionComponent
  ],
  imports: [
    CommonModule,
    ConnectionRoutingModule,
    SharedModule
  ]
})
export class ConnectionModule { }
