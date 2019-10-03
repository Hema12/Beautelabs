import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface Products {
  productName: string;
  productSKU: string
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  vendorForm: FormGroup;
  productsList:any;
  products: Products[] = [
    {productName: 'Loreal Shampoo', productSKU:'JHHJHWE987'},
    {productName: 'Skeydnor Cleansor', productSKU:'PIOII34HJK'},
    {productName: 'LAKME Peel Off Mask', productSKU:'QWEWQEHJ7'},
    {productName: 'MAYBELLINE Concealer', productSKU:'MNMBMJ87'},
    {productName: 'BIO SANDALWOOD', productSKU:'LKJKSDF6SDF'}
  ];
  productDet = new FormControl();
  filteredProducts: Observable<Products[]>; 
  constructor(
    private formBuilder: FormBuilder) { 
      this.filteredProducts = this.productDet.valueChanges
      .pipe(
        startWith(''),
        map(products => products ? this._filterProducts(products) : this.products.slice())
      );
    }

  ngOnInit() {
    this.vendorForm = new FormGroup({
      vendorName: new FormControl(null, Validators.required),
      vendorRefNo: new FormControl(null, Validators.required),
      vendorMobile: new FormControl(null, [Validators.required,Validators.pattern('[6-9]\\d{9}')]),
      vendorAltMobile: new FormControl(null,[Validators.pattern('[6-9]\\d{9}')]),
      vendorWhatsappMobile: new FormControl(null,[Validators.pattern('[6-9]\\d{9}')]),
      vendorEmail: new FormControl(null, [Validators.required, Validators.email]),
      vendorStreet1: new FormControl(null, Validators.required),
      vendorStreet2: new FormControl(null),
      vendorCity: new FormControl(null, Validators.required),
      vendorState: new FormControl(null, Validators.required),
      vendorPinCode: new FormControl(null, [Validators.required,Validators.pattern('[1-9]\\d{5}')]),
      gstNumber: new FormControl(null, Validators.required),
      gstApplicable: new FormControl(null),
      vendorStreet: new FormControl(null, Validators.required),
      vendorProducts:this.formBuilder.array([this.createVendorPoducts()]),
      vendorNote: new FormControl(null)
    })
  }
  dobCheck(event) {
    return false;
  }

  private _filterProducts(value: string): Products[] {
    const filterValue = value;        
    return this.products.filter(products => products.productName.toLowerCase().indexOf(filterValue) === 0 || products.productSKU.indexOf(filterValue) === 0);
  }
  createVendorPoducts(): FormGroup {
    return this.formBuilder.group({
      productName: new FormControl(),
      productPrice: new FormControl(),
      productIsRetail: new FormControl(),
      productDisc: new FormControl(),
      productStartDisc: new FormControl(),
      productEndDisc: new FormControl(),
    });
 }
 addServiceProducts(): void {
  this.productsList = this.vendorForm.get('vendorProducts') as FormArray;
  this.productsList.push(this.createVendorPoducts());
}

Delete(_index) {
  this.productsList.removeAt(_index);
}
}
