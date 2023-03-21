import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { DiscountInfoComponent } from './discount-info/discount-info.component';
import { DiscountInfoResolver } from '../../shared/services/discount/discount-info.resolver';


const routes: Routes = [
  {
    path: '', component: DiscountComponent
  },
  {
    path: ':id',
    component: DiscountInfoComponent,
    resolve: {
        discountInfo: DiscountInfoResolver
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
