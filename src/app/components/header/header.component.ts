import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import {ConnectionComponent} from "../../pages/connection/connection.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userCategories: Array<ICategoryResponse> = [];
  public isLogin:boolean = false;
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
    private router: Router,
    public dialog: MatDialog
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
      } else if(currentUser && currentUser.role === ROLE.USER) {
        this.isLogin = true;
        this.loginUrl = 'cabinet';
        this.loginPage = 'Cabinet';
      } else {
        this.isLogin = false;
        this.loginUrl = '';
        this.loginPage = '';
      }
    }

    checkUpdatesUserLogin(): void {
      this.accountService.isUserLogin$.subscribe(() => {
        this.checkUserLogin();
      })
    }

    openLoginDialog(): void {
      this.dialog.open(AuthDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false
      }).afterClosed().subscribe(result => {
        console.log(result);
      })
    }

      openBasketDialog(): void {
        let top_basket = '95px';
        const innerWidth = window.innerWidth;
        if (innerWidth < 1199) {
          top_basket = '60px'
        } else top_basket = '95px';
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position = {
          top:  '' + top_basket,
          right: '0px'
        };
        this.dialog.open(CheckoutComponent, {
          backdropClass: 'dialog-back',
          panelClass: 'auth-dialog-basket',
          autoFocus: false,
          position: dialogConfig.position
        }).afterClosed().subscribe(result => {
          console.log(result);
          this.isCheckout = false;
        })
        this.isCheckout = true;
    }

  openConnectionDialog(): void {
    this.dialog.open(ConnectionComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
