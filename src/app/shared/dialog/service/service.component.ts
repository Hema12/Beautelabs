import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface serviceCategory {
  categoryName: string;
}
export interface serviceSubCategory {
  subcategoryName: string;
}
export interface Products {
  productName: string;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  serviceForm: FormGroup;
  service:any;
  products: Products[] = [
    {productName: 'Loreal Shampoo'},
    {productName: 'Skeydnor Cleansor'},
    {productName: 'LAKME Peel Off Mask'},
    {productName: 'MAYBELLINE Concealer'},
    {productName: 'BIO SANDALWOOD'}
  ];

  category: serviceCategory[] = [
    {categoryName: 'Hair Care'},
    {categoryName: 'Face Pack'},
    {categoryName: 'Face Cream'},
    {categoryName:'Shampoo'}
  ];
  subcategory: serviceSubCategory[] = [
    {subcategoryName: 'Hair Care'},
    {subcategoryName: 'Face Pack'},
    {subcategoryName: 'Face Cream'},
    {subcategoryName:'Shampoo'}
  ];
  productDet = new FormControl();
  filteredProducts: Observable<Products[]>; 
  constructor( public dialogRef: MatDialogRef<ServiceComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.filteredProducts = this.productDet.valueChanges
      .pipe(
        startWith(''),
        map(products => products ? this._filterProducts(products) : this.products.slice())
      );
    }

  ngOnInit() {
    this.serviceForm = new FormGroup({
      serviceName: new FormControl(null, Validators.required),
      serviceCategory: new FormControl(null, Validators.required),
      serviceSubCategory: new FormControl(null, Validators.required),
      servicePrice:new FormControl(null, Validators.required),
      serviceUOM:new FormControl(null),
      serviceEndDate: new FormControl(null),
      serviceDuration: new FormControl(null, Validators.required),
      serviceProducts: this.formBuilder.array([this.createServiceProducts()]),      
      productUOM: new FormControl(null),
      serviceNote: new FormControl(null)
    })
  }
  dobCheck(event) {
    return false;
  }
 
  cloesModal() {
    this.dialogRef.close();
  }
 
  private _filterProducts(value: string): Products[] {
    const filterValue = value;       
     
    return this.products.filter(productsname => productsname.productName.toLowerCase().indexOf(filterValue) === 0);
  }
  createServiceProducts(): FormGroup {
    return this.formBuilder.group({
      productUsed: new FormControl(),
      productConsumed: new FormControl(),
    });
 }
 addServiceProducts(): void {
  this.service = this.serviceForm.get('serviceProducts') as FormArray;
  this.service.push(this.createServiceProducts());
}

Delete(_index) {
  this.service.removeAt(_index);
}
create() {
  
}
}
