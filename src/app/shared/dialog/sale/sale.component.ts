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
  lineSubTotal: number = 0;
  subTotal: number = 0;
  grandTotal: any;
  serviceQty: any = 0;
  servicePrice: any = 0;
  serviceDisc: any = 0;
  serviceTotalPrice: any = 0;
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
      grandTotal: new FormControl(null),
      remainingChange: new FormControl(null)
    });
    
  }
  private _filterCustomer(value: string): Customer[] {
    const filterValue = value;       
    console.log(filterValue);
     
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
    this.lineSubTotal = this.saleForm.controls['service']['controls'][index].controls.serviceTotalPrice.value;   
    this.subTotal = this.lineSubTotal;
    this.saleForm.controls['subTotal'].setValue(this.subTotal);
  }
  
}

// product price calculation
productPriceCalc() {
  const length =  this.saleForm.controls['product']['controls'].length;
  const q = 0;
  const p = 0;
  const d = 0;
  for (let index = 0; index < length; index++) {
    const q = this.saleForm.controls['product']['controls'][index].controls.productQty.value;
    const p = this.saleForm.controls['product']['controls'][index].controls.productPrice.value;
    const d = this.saleForm.controls['product']['controls'][index].controls.productDisc.value;
    this.saleForm.controls['product']['controls'][index].controls.productTotalPrice.setValue(q * p - d);   
    this.productTotal = this.saleForm.controls['product']['controls'][index].controls.productTotalPrice.value;    
  } 
  this.saleForm.controls['subTotal'].setValue(this.lineSubTotal + this.productTotal);
}
}

