import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {DateAdapter} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

export interface Service {
  name: string;
}
export interface Product {
  name: string;
}
export interface Customer {
  name: string;
  mobile:string;
}
export interface Staff {
  value: string;
  viewValue: string;
}
export interface Status {
  value: string;
  viewValue: string;
}
export interface State {
  name: string;
}
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  saleForm: FormGroup;
  toDay = new Date();
  Type:string;
  saleId: any;
  serviceTotal: any;
  productTotal: any = 0;
  lineServiceSubTotal: number = 0;
  lineProductSubTotal: number = 0;
  subTotal: number = 0;
  grandTotal: any;
  testInput: any;
  serviceQty: any = 0;
  servicePrice: any = 0;
  serviceDisc: any = 0;
  productQty: any = 0;
  productPrice: any = 0;
  productDisc: any = 0;
  serviceTotalPrice: any = 0;
  productTotalPrice: any = 0;
  cgstTaxAmount:number = 0;
  sgstTaxAmount:number = 0;
  page_title:string;
  button_title: string;
  //service:any;
  service: any;
  product:any;
  services: Service[] = [
    {name: 'Hair Cut'},
    {name: 'Bleech'},
    {name: 'Facial'}
  ];
  products: Product[] = [
    {name: 'LOREAL Shampoo'},
    {name: 'LOREAL Hair Spa Cream'},
    {name: 'LAKME Face Cream'},
    {name: 'LOREAL Face Mask'}
  ];
  customer: Customer[] = [
    {name: 'Abhi', mobile:'9632587412'},
    {name: 'Anandh',mobile:'7894561232'},
    {name: 'Sruthi',mobile:'9764317946'},
    {name:'Ravi',mobile:'8293714697'}
  ];
  status: Status[] = [
    {value: 'New', viewValue: 'New'},
    {value: 'Arrived', viewValue: 'Customer Arrived'},
    {value: 'Started', viewValue: 'Service Started'},
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'Cancelled', viewValue: 'Cancelled'}
  ];
  staffs: Staff[] = [
    {value: 'Aadhi', viewValue: 'Aadhi'},
    {value: 'Devi', viewValue: 'Devi'},
    {value: 'Hari', viewValue: 'Hari'},
    {value: 'Jai', viewValue: 'Jai'},
    {value: 'Latha', viewValue: 'Latha'},
    {value: 'Karthi', viewValue: 'Karthi'},
    {value: 'Nisha', viewValue: 'Nisha'}
  ];
  saleCustomerDet = new FormControl();
  filteredCustomer: Observable<Customer[]>; 
  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
      this.saleId = this.activatedRoute.snapshot.params['saleId'];     
      if(this.saleId == '0') {
        this.page_title = 'New Quick Sale';
        this.button_title = 'Submit';
      } else {
        this.page_title = 'Quick Sale View';
        this.button_title = 'Update';
      }
      this.filteredCustomer = this.saleCustomerDet.valueChanges
    .pipe(
      startWith(''),
      map(customer => customer ? this._filterCustomer(customer) : this.customer.slice())
    );
    
     }

  ngOnInit() {
    this.saleForm = new FormGroup({
      customerName: new FormControl(null, Validators.required),
      bookingDate: new FormControl(null, Validators.required),    
      bookingStatus: new FormControl(null),      
      service: this.formBuilder.array([this.createService()]),      
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
  private _filterCustomer(value: string): Customer[] {
    const filterValue = value;            
    return this.customer.filter(customername => customername.name.toLowerCase().indexOf(filterValue) === 0 || customername.mobile.indexOf(filterValue) === 0);
  }
  createService(): FormGroup {
    return this.formBuilder.group({
      bookingService: new FormControl(),
      bookingStaff: new FormControl(),
      serviceQty: new FormControl(),
      servicePrice: new FormControl(),
      serviceDisc: new FormControl(),
      serviceTotalPrice: new FormControl(),
    });
 }

addService(): void {
  this.service = this.saleForm.get('service') as FormArray;
  this.service.push(this.createService());
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
  this.product = this.saleForm.get('product') as FormArray;
  this.product.push(this.createProduct());
}
addPrepaid() {

}
addVoucher() {

}
addPackage() {
  
}
DeleteService(_index) {
  this.service.removeAt(_index);
}
DeleteProduct(_index) {
  this.product.removeAt(_index);
}
ModeOfPay(val) {
  this.Type = val;
}

//Service Amount Calculation
servicePriceCalc() {
  const length =  this.saleForm.controls['service']['controls'].length;  
  //For each formarray calculation
  for (let index = 0; index < length; index++) {
    //Get service quantity formcontrol value and store it to variable q
    this.serviceQty = this.saleForm.controls['service']['controls'][index].controls.serviceQty.value;
    this.servicePrice = this.saleForm.controls['service']['controls'][index].controls.servicePrice.value;
    this.serviceDisc = this.saleForm.controls['service']['controls'][index].controls.serviceDisc.value;
    //calculate and set it to servicetotalprice formcontrol
    this.saleForm.controls['service']['controls'][index].controls.serviceTotalPrice.setValue(this.serviceQty * this.servicePrice - this.serviceDisc);         
    this.lineServiceSubTotal = this.saleForm.controls['service']['controls'][index].controls.serviceTotalPrice.value;   
  }
}

// product price calculation
productPriceCalc() {
  const length =  this.saleForm.controls['product']['controls'].length; 
  for (let index = 0; index < length; index++) {
    this.productQty = this.saleForm.controls['product']['controls'][index].controls.productQty.value;
    this.productPrice = this.saleForm.controls['product']['controls'][index].controls.productPrice.value;
    this.productDisc = this.saleForm.controls['product']['controls'][index].controls.productDisc.value;
    this.saleForm.controls['product']['controls'][index].controls.productTotalPrice.setValue(this.productQty * this.productPrice - this.productDisc);   
    this.lineProductSubTotal = this.saleForm.controls['product']['controls'][index].controls.productTotalPrice.value;    
  } 
}

//Caluclate Sub Total include all added services and products
calculateTotal():number {  
  let servcieRows = this.saleForm.get('service') as FormArray;
  let productRows = this.saleForm.get('product') as FormArray;
  return servcieRows.controls.
      map((serviceRow)=> serviceRow.get('serviceQty').value * serviceRow.get('servicePrice').value - serviceRow.get('serviceDisc').value). //calcualte each amount
      reduce((sum,amount) => sum + amount,0) +  
    productRows.controls.
    map((productRow) => productRow.get('productQty').value * productRow.get('productPrice').value - productRow.get('productDisc').value). //calcualte each amount
    reduce((sum,amount) => sum + amount,0); //find sum
  }
  
//Tax1 Calculation
cgstCalc() {
  this.cgstTaxAmount = this.saleForm.controls['subTotal'].value * this.saleForm.controls['cgstTaxValue'].value / 100;
}

//Tax2 Calculation
sgstCalc() {
  this.sgstTaxAmount = this.saleForm.controls['subTotal'].value * this.saleForm.controls['sgstTaxValue'].value / 100;
}

//Calculate Total Tax Amount
calculateTotalTax() {  
  this.saleForm.controls['taxAmountTotal'].setValue(this.saleForm.controls['subTotal'].value * this.saleForm.controls['cgstTaxValue'].value / 100 + 
  this.saleForm.controls['subTotal'].value * this.saleForm.controls['sgstTaxValue'].value / 100);
}

//Calculate Grand Total 
calculateGrandTotal() {
  this.saleForm.controls['grandTotal'].setValue(this.saleForm.controls['subTotal'].value + this.saleForm.controls['taxAmountTotal'].value);
}
// CommaFormatted(event) {
//   // skip for arrow keys
//   if(event.which >= 37 && event.which <= 40) return;
 
//   // format number
//   if (this.testInput) {
//    this.testInput = this.testInput.replace(/\D/g, "")
//      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }}
 
//  numberCheck (args) {
//  if (args.key === 'e' || args.key === '+' || args.key === '-') {
//    return false;
//  } else {
//    return true;
//  }}

}

