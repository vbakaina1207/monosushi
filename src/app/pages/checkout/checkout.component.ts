import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account/account.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public total = 0;
  public basket: Array<IProductResponse> = [];
  // private positionRelativeToElement: ElementRef;

  constructor(
    private orderService: OrderService){
      
    // public dialogRef: MatDialogRef<CheckoutComponent>,
    // @Inject(MAT_DIALOG_DATA) public options: { positionRelativeToElement: ElementRef }) {

    //   this.positionRelativeToElement = options.positionRelativeToElement
  }

  ngOnInit() {
    this.loadBasket();
    this.updateBasket();
    // const matDialogConfig = new MatDialogConfig()
    // const rect: DOMRect = this.positionRelativeToElement.nativeElement.getBoundingClientRect()

    // matDialogConfig.position = { right: `0`, top: `${rect.bottom + 80}px` }
    // this.dialogRef.updatePosition(matDialogConfig.position)
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
    this.addToBasket(product, value);
  }

  addToBasket(product: IProductResponse, value: boolean): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);      
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        if (value) basket[index].count += 1;
        if (!value && basket[index].count > 1) basket[index].count -= 1;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);   
  }

  removeFromBasket(product: IProductResponse): void{
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket.splice(index,1);
      }
      localStorage.setItem('basket', JSON.stringify(basket));    
      this.orderService.changeBasket.next(true);         
    }
  }
}
