import { Component, OnInit, OnDestroy, SkipSelf } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouteReuseStrategy, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeProductResponse } from 'src/app/shared/interfaces/type-product/type-product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';
import { environment } from 'src/environments/environment';
import { ProductService } from './../../shared/services/product/product.service'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public userProducts: Array<IProductResponse> = [];
  public userTypeProducts: Array<ITypeProductResponse> = [];
  private eventSubscription!: Subscription;
  public isCategoryRolls: boolean = false;
  public isProductType: boolean = false;
  public categoryName!: string;
  public currentCategoryName!:string ;
  public currentProductTypeName!: string;

  constructor(
    private productService: ProductService,
    private productTypeService: TypeProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.loadProducts();
        this.getTypeProducts();
      }
    })
  }

  ngOnInit(): void {}


  getTypeProducts(): void {
    this.productTypeService.getAll().subscribe(data => {
      this.userTypeProducts = data;
    })
  }


  loadProducts(): void {
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    const productTypeName = this.activatedRoute.snapshot.paramMap.get('type_product') as string;
    let currentExtras = this.router.getCurrentNavigation()?.extras.skipLocationChange;
    this.productService.getAllByCategory(this.categoryName).subscribe(data => {
      this.userProducts = data;
      this.currentCategoryName = this.userProducts[0]?.category.name;
    });
    if (productTypeName){
      this.productService.getAllByProductType(productTypeName).subscribe(data => {
            this.userProducts = data;
            this.currentProductTypeName = this.userProducts[0]?.type_product.name;
          });
    }
    if (this.categoryName === 'rols'  || this.router.url == '/' ) {
      this.isCategoryRolls = true;
      if(this.router.url == '/') {
        this.categoryName = 'rols';
        this.currentCategoryName = '';
      }
    } else this.isCategoryRolls = false;
    if (this.router.url !== '/product/rols/' && this.categoryName === 'rols') {
      if(currentExtras )
      {
        this.isCategoryRolls = true;
        this.isProductType = false;
      } else {
        this.isCategoryRolls = false;
        this.isProductType = true;
      }
    }
    if( this.router.url == '/') this.isCategoryRolls = true;
  }


  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
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
