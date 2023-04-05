/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductTypeComponent } from './admin-product-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { TypeProductService } from '../../shared/services/type-product/type-product.service';
import {ICategoryRequest, ICategoryResponse} from "../../shared/interfaces/category/category.interface";
import {ITypeProductRequest, ITypeProductResponse} from "../../shared/interfaces/type-product/type-product.interface";

describe('AdminProductTypeComponent', () => {
  let component: AdminProductTypeComponent;
  let fixture: ComponentFixture<AdminProductTypeComponent>;
  let typeProductService: TypeProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductTypeComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty list types of products'`, () => {
    const fixture = TestBed.createComponent(AdminProductTypeComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(TypeProductService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([]);
    });
    app.loadTypeProducts();
    expect(app.adminTypeProducts).toEqual([]);
  });

  it(`should return list types of products'`, () => {
    const fixture = TestBed.createComponent(AdminProductTypeComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(TypeProductService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([
        {
          id: 1,
          name: 'set',
          path: 'set'}
      ]);
    });
    app.loadTypeProducts();
    expect(app.adminTypeProducts.length).toEqual(1);
  });



  it('sending form values type of product', () => {
    spyOn(component, 'editTypeProduct').and.callThrough();
    component.editTypeProduct({
        id: 4,
        name: 'california',
        path: 'california',
    });
    expect(component.editTypeProduct).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });


  it('should send add new type of product', () => {
    const typeProductRequest: ITypeProductRequest = {
      name: 'set',
      path: 'set',
    };

    const expectedTypeProduct: ITypeProductResponse = {
      id: 1,
      name: 'set',
      path: 'set'
    };
    let editStatus = true;
    component.editStatus = editStatus;
    component.addTypeProduct();
    if (editStatus) {
      typeProductService?.create(typeProductRequest).subscribe(result => {
        expect(result).toEqual(expectedTypeProduct);
      });
    }
    editStatus = false;
    if (!editStatus) {
      typeProductService?.update(typeProductRequest, 1).subscribe(result => {
        expect(result).toEqual(expectedTypeProduct);
      });
    }
    expect(component).toBeTruthy();
  });


  it('delete values type of product', () => {
    spyOn(component, 'deleteTypeProduct').and.callThrough();
    component.deleteTypeProduct({
      id: 2,
      name: 'set',
      path: 'set',
    });
    typeProductService?.delete(2).subscribe(result => {
      expect(result).toEqual();
    });
    expect(component).toBeTruthy();
  });


});

