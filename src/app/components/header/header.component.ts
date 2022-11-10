import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/conatants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userCategories: Array<ICategoryResponse> = [];
  public isLogin:boolean = false;
  public isAuthorization:boolean = false;
  public isCheckout:boolean = false;
  public loginUrl:string = '';
  public loginPage:string = '';
  public total = 0;
  public count = 0;
  private basket: Array<IProductResponse> = [];

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();  
  }


  getCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.userCategories = data;
    })
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
      this.count = this.basket
      .reduce((totalCount: number, prod: IProductResponse) => totalCount + prod.count, 0);
  }

  

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

    checkUserLogin(): void {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      if(currentUser && currentUser.role === ROLE.ADMIN){
        this.isLogin = true;
        this.loginUrl = 'admin';
        this.loginPage = 'Admin';
        this.isAuthorization = true;
      } else if(currentUser && currentUser.role === ROLE.USER) {
        this.isLogin = true;
        this.loginUrl = 'cabinet';
        this.loginPage = 'Cabinet';
        this.isAuthorization = true;
      } else {
        this.isLogin = false;
        this.loginUrl = '';
        this.loginPage = '';
        this.isAuthorization = false;
      }     
    }
  
    checkUpdatesUserLogin(): void {
      this.accountService.isUserLogin$.subscribe(() => {
        this.checkUserLogin();
      })
    }
  
    openModal():void{
      this.isAuthorization = true;
    }

    openBacket():void {
      this.isCheckout = !this.isCheckout;
    }

    
  

}
