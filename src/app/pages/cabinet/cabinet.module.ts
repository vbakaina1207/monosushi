import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { PersonalComponent } from './personal/personal.component';
import { HistoryComponent } from './history/history.component';
import { CabinetComponent } from './cabinet.component';
import { SharedModule } from '../../shared/sahared.module';
import { PasswordComponent } from './password/password.component';




@NgModule({
  declarations: [
    CabinetComponent,
    PersonalComponent,
    HistoryComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
