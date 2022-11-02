import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeProductResponse } from 'src/app/shared/interfaces/type-product/type-product.interface';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';
import { ProductService } from './../../shared/services/product/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public userProducts: Array<IProductResponse> = [];
  public userTypeProducts: Array<ITypeProductResponse> = [];

  constructor(
    private productService: ProductService,
    private typeProductService: TypeProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTypeProducts();
  }

  getProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.userProducts = data;
    })
  }


  getTypeProducts(): void {
    this.typeProductService.getAll().subscribe(data => {
      this.userTypeProducts = data;
    })
  }
}
