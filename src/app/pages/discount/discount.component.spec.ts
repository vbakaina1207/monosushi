/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DiscountComponent } from './discount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {of} from "rxjs";
import { DiscountService } from '../../shared/services/discount/discount.service';

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get types products', () => {
    const fixture = TestBed.createComponent(DiscountComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(DiscountService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([]);
    });
    app.getDiscounts();
    expect(app.userDiscounts).toEqual([]);
  });
});
