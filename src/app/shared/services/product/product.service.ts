import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest } from '../../interfaces/product/product.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore, query,
  updateDoc, where
} from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  private apiTypeProduct = { productsType: `${this.url}/products` };
  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
    ) {
    this.productCollection = collection(this.afs, 'products');
  }

  /*
  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }

  getAllByCategory(name: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${name}`);
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  }

  getAllByProductType(name: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.apiTypeProduct.productsType}?type_product.path=${name}`);
  }

  create(product: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, product);
  }

  update(product: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }

*/
  //-----------------  firebase ------------------------------------------------

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  getAllByProductTypeFirebase(name: string) {
    let productByTypeProduct  = query(this.productCollection, where('type_product.path','==', `${name}`));
    return collectionData(productByTypeProduct,  { idField: 'id' });
  }


 getAllByCategoryFirebase(name: string) {
    let productByCategory  = query(this.productCollection, where('category.path','==', `${name}`));
     return collectionData(productByCategory,  { idField: 'id' });
  }
  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }


}
