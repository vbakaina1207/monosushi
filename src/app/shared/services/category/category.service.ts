import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategoryRequest } from '../../interfaces/category/category.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore'

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };
  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  /*
  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.categories);
  }

  create(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.api.categories, category);
  }

  update(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.api.categories}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }

*/
  //-------------------------------------------------------------------------------------------------------
  //firebase

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  createFirebase(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

}
