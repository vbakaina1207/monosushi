/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffertaComponent } from './offerta.component';

describe('OffertaComponent', () => {
  let component: OffertaComponent;
  let fixture: ComponentFixture<OffertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
