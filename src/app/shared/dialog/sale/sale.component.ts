import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {DateAdapter} from '@angular/material/core';

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
    private formBuilder: FormBuilder) {
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
}
