/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import { ImageService } from './image.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Storage } from '@angular/fire/storage';
import {AuthorizationComponent} from "../../../pages/authorization/authorization.component";

describe('Service: Image', () => {
  let imageService: ImageService;
  let fixture: ComponentFixture<ImageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireStorageModule
      ],
      providers: [
         ImageService  ,
         { provide: Storage, useValue: {} }
      ]
    });
  });

  it('should ...', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));


});
