import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { ITypeProductResponse } from 'src/app/shared/interfaces/type-product/type-product.interface';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public adminTypeProducts: Array<ITypeProductResponse> = [];
  public productForm!: FormGroup; 
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  public isOpen = false;

  public currentCategoryId = 0;
  public currentCategoryName = '';
  private currentProductId = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private typeProductService: TypeProductService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
    this.loadTypeProduct();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      type_product: [null],
      name: [null, Validators.required], 
      path: [null, Validators.required],    
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required], 
      price_old: [null],     
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProduct(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  loadTypeProduct(): void {
    this.typeProductService.getAll().subscribe(data =>{
      this.adminTypeProducts = data;
      this.productForm.patchValue({
        type_product: this.adminTypeProducts[0].id
      })
    })
  }

  addProduct(): void {
    if(this.editStatus){
      this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProduct();
        this.toastr.success('Product successfully updated');
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
        this.toastr.success('Product successfully created');
      })
    }
    this.isOpen = false;
    this.editStatus = false;
    this.productForm.reset();
    this.uploadPercent = 0;
  }

  editProduct(product: IProductResponse): void {
    this.openForm();
    this.currentCategoryId = product.category.id;
    this.currentCategoryName = product.category.name;
    
    this.productForm.patchValue({
      category:  product.category,
      type_product: product.type_product,
      name: product.name,    
      path: product.path,  
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      price_old: product.price_old,
      imagePath: product.imagePath,
    });
    console.log(product.category);
    
    // this.isOpen = true;
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProduct();
      this.toastr.success('Product successfully deleted');
    })
  }

  // changeCategory(e:any) {
  //   this.productForm.get('category')?.setValue(e.target.value, {
  //     onlySelf:true,
  //   });
  // }

  openForm():void {
    this.isOpen = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: any): any {
    return this.productForm.get(control)?.value;
  }

  // toggleOpenForm(): void {
  //   this.isOpen = !this.isOpen;
  // }


}
