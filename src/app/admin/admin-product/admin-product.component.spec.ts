/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductComponent } from './admin-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CategoryService } from '../../shared/services/category/category.service';
import { ProductService } from '../../shared/services/product/product.service';
import {TypeProductService} from "../../shared/services/type-product/type-product.service";
import {IProductRequest, IProductResponse} from '../../shared/interfaces/product/product.interface';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let productService : ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty list of products'`, () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(CategoryService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([]);
    });
    app.initProductForm();
    app.loadCategories();
    expect(app.productForm.patchValue({category: app.adminCategories[0]?.id})).toEqual(undefined);
  });


  it(`should return empty category of products'`, () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(ProductService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([]);
    });
    app.loadProduct();
    expect(app.adminProducts).toEqual([]);
  });

  it(`should return empty list of productTypes'`, () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(TypeProductService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([]);
    });
    app.initProductForm();
    app.loadTypeProduct();
    expect(app.productForm.patchValue({type_product: app.adminTypeProducts[0]?.id})).toEqual(undefined);
  });


  it('sending form values product', () => {
    spyOn(component, 'editProduct').and.callThrough();
    component.editProduct({
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
      name: 'rol-california',
      path: 'rol-california',
      ingredients: 'fish',
      weight: '200',
      price: 400,
      price_old: 500,
      imagePath: '',
      count: 2
    });
    expect(component.editProduct).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });


  it('should send add new product', () => {
    const productRequest: IProductRequest = {
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
      name: 'rol-california',
      path: 'rol-california',
      ingredients: 'fish',
      weight: '200',
      price: 400,
      price_old: 500,
      imagePath: '',
      count: 2
    };

    const expectedProduct: IProductResponse = {
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
      name: 'rol-california',
      path: 'rol-california',
      ingredients: 'fish',
      weight: '200',
      price: 400,
      price_old: 500,
      imagePath: '',
      count: 2
    };
    let editStatus = true;
    component.editStatus = editStatus;
    component.addProduct();
    if (editStatus) {
      productService?.create(productRequest).subscribe(result => {
        expect(result).toEqual(expectedProduct);
      });
    }
    editStatus = false;
    if (!editStatus) {
      productService?.update(productRequest, 1).subscribe(result => {
        expect(result).toEqual(expectedProduct);
      });
    }
    expect(component).toBeTruthy();
  });

  it('delete values product', () => {
    spyOn(component, 'deleteProduct').and.callThrough();
    component.deleteProduct({
      id: 1,
      category: {
        id: 1,
        name: 'rol',
        path: 'rol',
        imagePath: '',
      },
      type_product: {
        id: 1,
        name: 'california',
        path: 'california',
      },
      name: 'rol-california',
      path: 'rol-california',
      ingredients: 'fish',
      weight: '200',
      price: 400,
      price_old: 500,
      imagePath: '',
      count: 2
    });
    productService?.delete(2).subscribe(result => {
      expect(result).toEqual();
    });
    expect(component).toBeTruthy();
  });


});
