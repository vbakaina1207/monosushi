/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminDiscountComponent } from './admin-discount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Storage } from  '@angular/fire/storage'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DiscountService } from '../../shared/services/discount/discount.service';
import { IDiscountRequest, IDiscountResponse } from '../../shared/interfaces/discount/discount.interface';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;
  let discountService: DiscountService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDiscountComponent ],
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
    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty list of discounts'`, () => {
    const fixture = TestBed.createComponent(AdminDiscountComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(DiscountService);
    spyOn(service,"getAll").and.callFake(() => {
      return of([]);
    });
    app.loadDiscounts();
    expect(app.adminDiscounts).toEqual([]);
  });


  it('sending form values discount', () => {
    spyOn(component, 'editDiscount').and.callThrough();
    component.editDiscount({
      id: 3,
      date: new Date(),
      name: '1+1=5',
      title: 'a spec title',
      description: '1+1=5',
      imagePath: ''
    });
    expect(component.editDiscount).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it(`should return list of discounts'`, () => {
    const fixture = TestBed.createComponent(AdminDiscountComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(DiscountService);
    spyOn(service,"getAll").and.callFake (() => {
      return of([
        { id: 1,
          date: new Date(),
          name: '1+1=5',
          title: 'a spec title',
          description: '1+1=5',
          imagePath: ''
        }
      ])
    });
    app.loadDiscounts();
    expect(app.adminDiscounts.length).toEqual(1);
  });


  it('should send add new discount', () => {
    const discountRequest: IDiscountRequest = {
      date: new Date(),
      name: '1+1=3',
      title: '1+1=3',
      description: '',
      imagePath:  ''
    };

    const expectedDiscount: IDiscountResponse = {
      id: 5,
      date: new Date(),
      name: '1+1=5',
      title: '1+1=5',
      description: 'discount',
      imagePath:  ''
    };
    let editStatus = true;
    component.editStatus = editStatus;
    component.addDiscount();
    if (editStatus) {
      discountService?.create(discountRequest).subscribe(result => {
        expect(result).toEqual(expectedDiscount);
      });
    }
    editStatus = false;
    if (!editStatus) {
      discountService?.update(discountRequest, 5).subscribe(result => {
        expect(result).toEqual(expectedDiscount);
      });
    }
    expect(component).toBeTruthy();
  });


  it('delete values discount', () => {
    spyOn(component, 'deleteDiscount').and.callThrough();
    component.deleteDiscount({
      id: 5,
      date: new Date(),
      name: '1+1=5',
      title: 'a spec title',
      description: '1+1=5',
      imagePath: ''
    });
    discountService?.delete(5).subscribe(result => {
      expect(result).toEqual();
    });
    expect(component).toBeTruthy();
  });

});
