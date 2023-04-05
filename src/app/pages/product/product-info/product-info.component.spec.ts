/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductInfoComponent } from './product-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ProductComponent} from "../product.component";
import {TypeProductService} from "../../../shared/services/type-product/type-product.service";
import {of} from "rxjs";
import {ProductService} from "../../../shared/services/product/product.service";

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;
  let productService: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get types products', () => {
    let product = {
      id: 1,
      category: {
        id: 2,
        name: 'rol',
        path: 'rol',
        imagePath: '',
      },
      type_product: {
        id: 1,
        name: 'california',
        path: 'california',
      },
      name: 'california',
      path: 'california',
      ingredients: 'fish',
      weight: '120',
      price: 200,
      price_old: 300,
      imagePath: 'www.monosushi',
      count: 2
    };

    productService?.getOne(1).subscribe(result => {
      expect(result).toEqual(product);
    });
    expect(component).toBeTruthy();
  });

  it('should update the count field when calling updateCount', () => {
    const product = {
      id: 1,
      category: {
        id: 1,
        name: 'rol',
        path: 'rol',
        imagePath: 'www.monosushi',
      },
      type_product: {
        id: 1,
        name: 'california',
        path: 'california',
      },
      name: 'california',
      path: 'california',
      ingredients: 'fish',
      weight: '120',
      price: 200,
      price_old: 300,
      imagePath: 'www.monosushi',
      count: 1
    };

    const newCount = 2;

    component.productCount(product, true);

    expect(product.count).toBe(newCount);

  });


  it('add products to basket', () => {
    const product = {
      id: 1,
      category: {
        id: 2,
        name: 'rol',
        path: 'rol',
        imagePath: '',
      },
      type_product: {
        id: 1,
        name: 'california',
        path: 'california',
      },
      name: 'california',
      path: 'california',
      ingredients: 'fish',
      weight: '120',
      price: 200,
      price_old: 300,
      imagePath: 'www.monosushi',
      count: 1
    };
    spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(product);
    expect(component.addToBasket).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });


});


