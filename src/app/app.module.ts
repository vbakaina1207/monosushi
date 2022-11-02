import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [	
    AppComponent,
      AdminComponent,
      AdminCategoryComponent,
      AdminProductComponent,
      AdminDiscountComponent,
      AdminOrdersComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      AboutComponent,
      DiscountComponent,
      ProductComponent,
      ConnectionComponent,
      DeliveryComponent,
      CheckoutComponent ,
      OffertaComponent,
      DiscountInfoComponent,
      ProductInfoComponent,
      ProductTypeComponent,
      AdminProductTypeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
