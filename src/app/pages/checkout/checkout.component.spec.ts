/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { CheckoutComponent } from './checkout.component';
import { RouterLink } from '@angular/router';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [ RouterLink ],
      schemas: [
        NO_ERRORS_SCHEMA
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
    const FAKE_BASKET = [
      {
        id: 1,
        category: {
          id: 2,
          name: 'rol',
          path: 'rol',
          imagePath: 'www.monosushi',
        },
        type_product: {
          id: 1,
          name: 'set',
          path: 'set',
        },
        name: 'california',
        path: 'california',
        ingredients: 'fish',
        weight: '120',
        price: 200,
        price_old: 300,
        imagePath: 'www.monosushi',
        count: 2
      }
    ];
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(400);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

   it('add products to basket', () => {
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
      spyOn(component, 'addToBasket').and.callThrough();
      component.addToBasket(product, true);
      expect(component.addToBasket).toHaveBeenCalled();
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

    const newCount = 1;

    component.productCount(product, true);

    expect(product.count).toBe(newCount);
  });


  it('remove products from basket', () => {
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
      count: 1
    };
    spyOn(component, 'removeFromBasket').and.callThrough();
    component.removeFromBasket(product);
    expect(component.removeFromBasket).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

});
