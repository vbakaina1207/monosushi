/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthDialogComponent } from './auth-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test login  #testIt()', fakeAsync (() => {
    const spy = spyOn(component,'login').and.callThrough();
    spy.and.returnValue(Promise.resolve({
      credential: null,
      user: null,
    }));
    component.login('admin@gmail.com','qwerty123');
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component).toBeTruthy();
  }));

  it('should check confirm password', () => {
    spyOn(component, 'checkVisibilityError').and.callThrough();
    component.checkVisibilityError('123123', '123123');
    expect(component).toBeTruthy();
  });


  it('should check confirm password', () => {
    component.password;
    component.confirmed;
    spyOn(component, 'checkConfirmPassword').and.callThrough();
    component.checkConfirmPassword();
    expect(component).toBeTruthy();
  });




});
