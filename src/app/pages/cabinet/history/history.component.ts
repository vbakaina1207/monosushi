import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { IOrderResponse } from '../../../shared/interfaces/order/order.interface';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from '../../../shared/interfaces/product/product.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public userOrders: Array<IOrderResponse> = [];
  public products: Array<IProductResponse> | any = [];
  private eventSubscription!: Subscription;
  private uid!: string;

  public currentUser: any;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.loadUser();
        this.getOrders();

      }
    })
  }

  ngOnInit() {

  }

  getOrders(): void {
    this.orderService.getUserFirebase(this.currentUser?.uid).subscribe(data => {
      this.userOrders = data as IOrderResponse[];
    })
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }
}
