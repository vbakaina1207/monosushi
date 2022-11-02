import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public product!: IProductResponse;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOneProduct();
  }

  getOneProduct(): void {
    const PRODUCT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(PRODUCT_ID).subscribe(data => {
      this.product = data;
    })
  }
}
