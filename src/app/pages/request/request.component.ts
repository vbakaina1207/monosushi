import { Component, OnInit } from '@angular/core';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { OrderService } from '../../shared/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from "@angular/router";
import { Firestore } from "@angular/fire/firestore";
import { IOrderResponse } from '../../shared/interfaces/order/order.interface';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  public total = 0;
  public basket: Array<IProductResponse> = [];
  public order: Array<IOrderResponse> = [];
  public orderForm!: FormGroup;
  public currentUser!: any;
  public currentOrder!: string;
  public currentNumOrder!: number;
  private eventSubscription!: Subscription;
 



  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private afs: Firestore,
    public dialog: MatDialog
    ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.loadUser();
        this.getOrders();
        this.loadBasket();
        this.updateBasket();
        this.initOrderForm();
      }
    })
  }

  ngOnInit(): void {


  }

  getOrders(): void {
    this.orderService.getAllFirebase().subscribe((data) => {
      this.order = data as IOrderResponse[];
      this.order[0].order_number += 1;
      this.currentNumOrder = this.order[0]?.order_number;
      this.currentOrder = this.order[0]?.id ;
      this.orderForm.patchValue({'order_number': this.order[0]?.order_number});
    })
  }


  initOrderForm(): void {
    this.getOrders();
    this.orderForm = this.fb.group({
      order_number: this.currentNumOrder,
      uid: this.currentUser?.uid || null,
      date_order: new Date(),
      status: false,
      total: this.total,
      product: [this.basket],
      name: [this.currentUser['firstName'] || null, Validators.required],
      phone: [this.currentUser['phoneNumber'] || null, Validators.required],
      delivery_method: [null, Validators.required],
      payment_method: [null, Validators.required],
      at_time: [null],
      self_delivery_date: [null],
      self_delivery_time: [null],
      select_point: [0],
      street: [null],
      house: [null],
      entrance: [null],
      flat: [null],
      no_call: [null],
      isComment: [false],
      comment: [null],
      isKitchen_comment: [null],
      comment_kitchen: [null],
      count_thing: [1],
      count_thing_study: ['Навчальні тримачі']
    });
  }

  loadBasket(): void {
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      ?.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    } 
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
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
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
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket.splice(index,1);
      }
      localStorage.setItem('basket', JSON.stringify(basket));
      this.orderService.changeBasket.next(true);
    }
  }


  addOrder(): void {
    if (this.currentUser && this.total >= 300) {
      this.orderService.createFirebase(this.orderForm.value).then(() => {
        this.toastr.success('Category successfully created');
      });
      this.removeAllFromBasket();
      this.router.navigate(['/cabinet/history']);
    } 
  }

  removeAllFromBasket(): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
        basket.splice(0);
      }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }
}
