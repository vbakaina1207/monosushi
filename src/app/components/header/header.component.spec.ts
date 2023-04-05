/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {ROLE} from "../../shared/constants/role.constant";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
          imagePath: '',
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

  it('should change total categories', () => {
    const FAKE_userCategories = [
      {
        id: 1,
        name: 'rol',
        path: 'rol',
        imagePath: 'www.monosushi'
      }
      ]
    component.userCategories = FAKE_userCategories;
    spyOn(component, 'getCategories').and.callThrough();
    component.getCategories();
    expect(component.getCategories).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it ('check user login', () => {
    const currentUser = {"orders":[],"email":"qwerty@gmail.com","lastName":"qwerty","address":["job","Kirchschlag","12",31],"phoneNumber":"+43661549621","role":"USER","firstName":"qwerty","uid":"0JHaDJvqWPeVXwxWeXZrOkdBuWx1"};
    currentUser.role = ROLE.USER;
    component.currentUser = currentUser;
    spyOn(component, 'checkUserLogin').and.callThrough();
    component.checkUserLogin();
    expect(component.checkUserLogin).toHaveBeenCalled();
    expect(component).toBeTruthy();
  })


});

