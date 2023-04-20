import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrderResponse } from 'src/app/shared/interfaces/order/order.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

public userOrders: Array<IOrderResponse> = [];
  public products: Array<IProductResponse> | any = [];
  private eventSubscription!: Subscription;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.getOrders();
      }
    })
  }

  ngOnInit() {
  }

  getOrders(): void {
    this.orderService.getAllFirebase().subscribe(data => {
      this.userOrders = data as IOrderResponse[];
    })
  }

}
