/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypeProductService } from './type-product.service';

describe('Service: TypeProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeProductService]
    });
  });

  it('should ...', inject([TypeProductService], (service: TypeProductService) => {
    expect(service).toBeTruthy();
  }));
});
