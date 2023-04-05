/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';

describe('Service: Product', () => {
  let httpTestingController: HttpTestingController;
  let productService: ProductService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ProductService ],
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.get( HttpTestingController );
    productService = TestBed.get(ProductService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));



  it('can test HttpClient.get', () => {
    const data = [
      {
      id: 1,
        price_old: 100,
      imagePath: '',
      count: 5
    },
      {
        id: 2,
        price_old: 200,
        imagePath: '',
        count: 15
      }]
    productService.getAll().subscribe((response: any) => expect(response).toBe(data));
    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });



  it('should send create request and return new product', () => {
    const productRequest: IProductRequest = {
        category: {
          id: 1,
          name: 'rol',
          path: 'rol',
          imagePath: 'www.monosuschi',
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
    };

    const expectedProduct: IProductResponse = {
      id: 3,
      category: {
        id: 1,
        name: 'rol',
        path: 'rol',
        imagePath: 'www.monosuschi',
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
    };

    productService.create(productRequest).subscribe(result => {
      expect(result).toEqual(expectedProduct);
    });

    const expectedUrl = 'http://localhost:3000/products';
    const testRequest = httpTestingController.expectOne(expectedUrl);

    expect(testRequest.request.method).toEqual('POST');
    expect(testRequest.request.body).toEqual(productRequest);

    testRequest.flush(expectedProduct);
  });

});
