/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryService } from './category.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category/category.interface';



describe('Service: Category', () => {
  let httpTestingController: HttpTestingController;
  let categoryService: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.get( HttpTestingController );
    categoryService = TestBed.get(CategoryService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should ...', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));

  it('can test HttpClient.get', () => {
    const data = [
      {
        id: 1,
        name: 'rol',
        path: 'rol',
        imagePath: ''
      },
      {
        id: 2,
        name: 'set',
        path: 'set',
        imagePath: ''
      }]
    categoryService.getAll().subscribe((response: any) => expect(response).toBe(data));
    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('should send create request and return new category', () => {
    const categoryRequest: ICategoryRequest = {
      name: 'rol',
      path: 'rol',
      imagePath: ''
    };

    const expectedCategory: ICategoryResponse = {
      id: 3,
      name: 'rol',
      path: 'rol',
      imagePath: ''
    };

    categoryService.create(categoryRequest).subscribe(result => {
      expect(result).toEqual(expectedCategory);
    });

    const expectedUrl = 'http://localhost:3000/categories';
    const testRequest = httpTestingController.expectOne(expectedUrl);

    expect(testRequest.request.method).toEqual('POST');
    expect(testRequest.request.body).toEqual(categoryRequest);

    testRequest.flush(expectedCategory);
  });


});
