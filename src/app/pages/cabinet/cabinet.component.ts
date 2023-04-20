import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

    public isOpen: boolean = false;
    public title: string = 'Особисті дані';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  
  logout(): void {
    this.router.navigate(['/']);
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
        basket.splice(0);
      }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);

    
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
    
  }

  openMenu():void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(event:any):void {
    this.isOpen = false;
    this.title = event.target.value;
  }

}
