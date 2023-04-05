/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthorizationComponent } from './authorization.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { ReactiveFormsModule } from "@angular/forms";
import { Firestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('test login user  #testIt()', fakeAsync (() => {
     const spy = spyOn(component,'loginUser').and.callThrough();
     spy.and.returnValue(Promise.resolve({
       credential: null,
       user: null,
     }));
     component.loginUser('admin@gmail.com','qwerty123');
     tick();
     fixture.detectChanges();
     expect(spy).toHaveBeenCalled();
      expect(component).toBeTruthy();
   }));


});
