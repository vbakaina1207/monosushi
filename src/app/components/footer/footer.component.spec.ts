/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { FooterComponent } from './footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterLink } from '@angular/router';
import {AdminCategoryComponent} from "../../admin/admin-category/admin-category.component";
import {CategoryService} from "../../shared/services/category/category.service";
import {of} from "rxjs";
import {ICategoryRequest, ICategoryResponse} from "../../shared/interfaces/category/category.interface";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let categoryService: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports:[
        HttpClientTestingModule,
        RouterLink
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty list of categories'`, () => {
    const category: ICategoryResponse = {
      id: 3,
      name: 'set',
      path: 'set',
      imagePath: ''
    };
    component.getCategories();
    categoryService?.getAll().subscribe((response: any) => expect(response).toBe(category));
    expect(component).toBeTruthy();
  });
});
