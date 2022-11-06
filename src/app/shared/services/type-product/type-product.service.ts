import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITypeProductRequest, ITypeProductResponse } from '../../interfaces/type-product/type-product.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {

  private url = environment.BACKEND_URL;
  private api = { typesProduct: `${this.url}/typesProduct` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<ITypeProductResponse[]> {
    return this.http.get<ITypeProductResponse[]>(this.api.typesProduct);
  }

  // getAllByTypeProduct(name: string): Observable<ITypeProductResponse[]> {
  //   return this.http.get<ITypeProductResponse[]>(`${this.api.typesProduct}?category.path=${name}`);
  // }
  create(typeProduct: ITypeProductRequest): Observable<ITypeProductResponse> {
    return this.http.post<ITypeProductResponse>(this.api.typesProduct, typeProduct);
  }

  update(typeProduct: ITypeProductRequest, id: number): Observable<ITypeProductResponse> {
    return this.http.patch<ITypeProductResponse>(`${this.api.typesProduct}/${id}`, typeProduct);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.typesProduct}/${id}`);
  }
}
