import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface Vendor {
  name: string;
  mobile:string;
}

export interface Product {
  name: string;
}

@Component({
  selector: 'app-purchase-order-create',
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.scss']
})
export class PurchaseOrderCreateComponent implements OnInit {
  poForm: FormGroup;
  Type:string;
  product:any;
  productTotal: any = 0;
  lineProductSubTotal: number = 0;
  subTotal: number = 0;
  grandTotal: any;
  productQty: any = 0;
  productPrice: any = 0;
  productDisc: any = 0;
  productTotalPrice: any = 0;
  cgstTaxAmount:number = 0;
  sgstTaxAmount:number = 0;
  vendor: Vendor[] = [
    {name: 'Abhi', mobile:'9632587412'},
    {name: 'Anandh',mobile:'7894561232'},
    {name: 'Sruthi',mobile:'9764317946'},
    {name:'Ravi',mobile:'8293714697'}
  ];
  products: Product[] = [
    {name: 'LOREAL Shampoo'},
    {name: 'LOREAL Hair Spa Cream'},
    {name: 'LAKME Face Cream'},
    {name: 'LOREAL Face Mask'}
  ];
  vendorDet = new FormControl();
  filteredVendor: Observable<Vendor[]>; 
  constructor(private formBuilder: FormBuilder) {
    this.filteredVendor = this.vendorDet.valueChanges
    .pipe(
      startWith(''),
      map(vendor => vendor ? this._filterVendor(vendor) : this.vendor.slice())
    );    
   }

  ngOnInit() {
    this.poForm = new FormGroup({
      vendorName: new FormControl(null, Validators.required),
      poNumber: new FormControl(null),
      bookingDate: new FormControl(null, Validators.required),    
      bookingStatus: new FormControl(null),           
      product: this.formBuilder.array([this.createProduct()]),      
      bookingNote: new FormControl(null),
      paymentMode: new FormControl(null),
      subTotal: new FormControl(null),
      cgstAmount: new FormControl(null),
      sgstAmount: new FormControl(null),
      grandTotal: new FormControl(null),
      cgstTaxValue: new FormControl(null),
      sgstTaxValue: new FormControl(null),
      taxAmountTotal: new FormControl(null),
      remainingChange: new FormControl(null),
      testInput: new FormControl(null)

    });
  }

  private _filterVendor(value: string): Vendor[] {
    const filterValue = value;            
    return this.vendor.filter(vendorname => vendorname.name.toLowerCase().indexOf(filterValue) === 0 || vendorname.mobile.indexOf(filterValue) === 0);
  }
  
  createProduct(): FormGroup {
    return this.formBuilder.group({
      productName: new FormControl(),
      productQty: new FormControl(),
      productPrice: new FormControl(),
      productDisc: new FormControl(),
      productTotalPrice: new FormControl(),
    });
  }
  
  addProduct(): void {
    this.product = this.poForm.get('product') as FormArray;
    this.product.push(this.createProduct());
  }

  
// product price calculation
productPriceCalc() {
  const length =  this.poForm.controls['product']['controls'].length; 
  for (let index = 0; index < length; index++) {
    this.productQty = this.poForm.controls['product']['controls'][index].controls.productQty.value;
    this.productPrice = this.poForm.controls['product']['controls'][index].controls.productPrice.value;
    this.productDisc = this.poForm.controls['product']['controls'][index].controls.productDisc.value;
    this.poForm.controls['product']['controls'][index].controls.productTotalPrice.setValue(this.productQty * this.productPrice - this.productDisc);   
    this.lineProductSubTotal = this.poForm.controls['product']['controls'][index].controls.productTotalPrice.value;    
  } 
}

//Caluclate Sub Total include all added services and products
calculateTotal():number {  
  let productRows = this.poForm.get('product') as FormArray;
  return productRows.controls.    
    map((productRow) => productRow.get('productQty').value * productRow.get('productPrice').value - productRow.get('productDisc').value). //calcualte each amount
    reduce((sum,amount) => sum + amount,0); //find sum
  }
  
//Tax1 Calculation
cgstCalc() {
  this.cgstTaxAmount = this.poForm.controls['subTotal'].value * this.poForm.controls['cgstTaxValue'].value / 100;
}

//Tax2 Calculation
sgstCalc() {
  this.sgstTaxAmount = this.poForm.controls['subTotal'].value * this.poForm.controls['sgstTaxValue'].value / 100;
}

//Calculate Total Tax Amount
calculateTotalTax() {  
  this.poForm.controls['taxAmountTotal'].setValue(this.poForm.controls['subTotal'].value * this.poForm.controls['cgstTaxValue'].value / 100 + 
  this.poForm.controls['subTotal'].value * this.poForm.controls['sgstTaxValue'].value / 100);
}

//Calculate Grand Total 
calculateGrandTotal() {
  this.poForm.controls['grandTotal'].setValue(this.poForm.controls['subTotal'].value + this.poForm.controls['taxAmountTotal'].value);
}
DeleteProduct(_index) {
  this.product.removeAt(_index);
}
ModeOfPay(val) {
  this.Type = val;
}
}
