/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminCategoryComponent } from './admin-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { CategoryService } from '../../shared/services/category/category.service';
import {AdminDiscountComponent} from "../admin-discount/admin-discount.component";
import {DiscountService} from "../../shared/services/discount/discount.service";
import {IDiscountRequest, IDiscountResponse} from "../../shared/interfaces/discount/discount.interface";
import {ICategoryRequest, ICategoryResponse} from "../../shared/interfaces/category/category.interface";

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let categoryService: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it(`should return empty list of categories'`, () => {
    const fixture = TestBed.createComponent(AdminCategoryComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(CategoryService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([]);
    });
    app.loadCategories();
    expect(app.adminCategories).toEqual([]);
  });


  it('sending form values category', () => {
    spyOn(component, 'editCategory').and.callThrough();
    component.editCategory({
      id: 3,
      name: 'set',
      path: 'set',
      imagePath: ''
    });
    expect(component.editCategory).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });


  it(`should return list of categories'`, () => {
    const fixture = TestBed.createComponent(AdminCategoryComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(CategoryService);
    spyOn(service,"getAll").and.callFake (() => {
      return of([
        { id: 1,
          name: 'set',
          path: 'set',
          imagePath: ''
        },
        { id: 2,
          name: 'rol',
          path: 'rol',
          imagePath: ''
        }
      ])
    });
    app.loadCategories();
    expect(app.adminCategories.length).toEqual(2);
  });


  it('should send add new category', () => {
    const categoryRequest: ICategoryRequest = {
      name: 'set',
      path: 'set',
      imagePath: ''
    };

    const expectedCategory: ICategoryResponse = {
      id: 5,
      name: 'set',
      path: 'set',
      imagePath: ''
    };
    let editStatus = true;
    component.editStatus = editStatus;
    component.addCategory();
    if (editStatus) {
      categoryService?.create(categoryRequest).subscribe(result => {
        expect(result).toEqual(expectedCategory);
      });
    }
    editStatus = false;
    if (!editStatus) {
      categoryService?.update(categoryRequest, 5).subscribe(result => {
        expect(result).toEqual(expectedCategory);
      });
    }
    expect(component).toBeTruthy();
  });



  it('delete values category', () => {
    spyOn(component, 'deleteCategory').and.callThrough();
    component.deleteCategory({
      id: 2,
      name: 'set',
      path: 'set',
      imagePath: ''
    });
    categoryService?.delete(2).subscribe(result => {
      expect(result).toEqual();
    });
    expect(component).toBeTruthy();
  });


});


