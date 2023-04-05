/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../shared/services/product/product.service';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";
import {TypeProductService} from "../../shared/services/type-product/type-product.service";
import {AdminDiscountComponent} from "../../admin/admin-discount/admin-discount.component";
import {DiscountService} from "../../shared/services/discount/discount.service";
import {of} from "rxjs";


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  let productTypeService: TypeProductService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loading products', () => {
    const data = [
      {
        id: 1,
        category: {
          id: 1,
          name: 'rol',
          path: 'rol',
          imagePath: 'www.monosuschi',
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
      }
    ]
    let categoryName = 'rols';
    const productTypeName = 'california';
    component.categoryName = categoryName;
    component.productTypeName = productTypeName;
    component.loadProducts();
    productService?.getAllByCategory(categoryName).subscribe(result => {
      expect(result).toEqual(data);
    });
    if (productTypeName){
      productService?.getAllByProductType(productTypeName).subscribe(result => {
        expect(result).toEqual(data);
      });
    }
    expect(component).toBeTruthy();
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


  //it('should save data to local storage', () => {
  // beforeEach(() => {
  //
  //   let localStore = {};
  //
  //   spyOn(window.localStorage, 'getItem').and.callFake((key) =>
  //     key in localStore ? key : null
  //   );
  //   spyOn(window.localStorage, 'setItem').and.callFake(
  //     (key, value) => (value + '')
  //   );
  //   spyOn(window.localStorage, 'clear').and.callFake(() => ({}));
  // });


  it('should set an Item', () => {
    localStorage.setItem("test", '2');
    expect(localStorage.getItem("test")).toBe("2");
    expect(localStorage.key(0)).toBe("test");
  });


   it('should get types products', () => {
     const fixture = TestBed.createComponent(ProductComponent);
     const app = fixture.componentInstance;
     let service = fixture.debugElement.injector.get(TypeProductService);
     spyOn(service,"getAll").and.callFake(() => {
       return of([]);
     });
     app.getTypeProducts();
     expect(app.userTypeProducts).toEqual([]);
   });

  it('should update the count field when calling updateCount', () => {
    const product = {
      id: 1,
      category: {
        id: 1,
        name: 'rol',
        path: 'rol',
        imagePath: 'www.monosuschi',
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
  })
});
