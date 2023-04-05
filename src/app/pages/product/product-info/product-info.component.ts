import { Component, OnInit,  OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import {Subscription} from 'rxjs';
import {ICategoryResponse} from "../../../shared/interfaces/category/category.interface";



@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public currentProduct!: IProductResponse;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService

  ) { }

  ngOnInit(): void {
    this.loadProduct();
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response['productInfo'];
    })
  }

  loadProduct(): void {
    const PRODUCT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(PRODUCT_ID).subscribe(data => {
      this.currentProduct = data;
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
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



}
