/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypeProductService } from './type-product.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ITypeProductRequest, ITypeProductResponse } from '../../interfaces/type-product/type-product.interface';

describe('Service: TypeProduct', () => {
  let httpTestingController: HttpTestingController;
  let typeProductService: TypeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeProductService],
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.get( HttpTestingController );
    typeProductService = TestBed.get(TypeProductService);
  });


  afterEach(() => {
    httpTestingController.verify();
  });

  it('should ...', inject([TypeProductService], (service: TypeProductService) => {
    expect(service).toBeTruthy();
  }));

  it('can test HttpClient.get', () => {
    const data = [
      {
        id: 1,
        name: 'rol',
        path: 'rol'
      },
      {
        id: 2,
        name: 'set',
        path: 'set'
      }]
    typeProductService.getAll().subscribe((response: any) => expect(response).toBe(data));
    const req = httpTestingController.expectOne('http://localhost:3000/typesProduct');
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });


  it('should send create request and return new product`s type', () => {
    const typeProductRequest: ITypeProductRequest = {
        name: 'rol',
        path: 'rol'
    };

    const expectedTypeProduct: ITypeProductResponse = {
        id: 3,
        name: 'rol',
        path: 'rol'
    };

    typeProductService.create(typeProductRequest).subscribe(result => {
      expect(result).toEqual(expectedTypeProduct);
    });

    const expectedUrl = 'http://localhost:3000/typesProduct';
    const testRequest = httpTestingController.expectOne(expectedUrl);

    expect(testRequest.request.method).toEqual('POST');
    expect(testRequest.request.body).toEqual(typeProductRequest);

    testRequest.flush(expectedTypeProduct);
  });


});
