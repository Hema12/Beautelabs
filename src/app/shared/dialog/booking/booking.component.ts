import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {DateAdapter} from '@angular/material/core';

export interface Service {
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
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  toDay = new Date();
  //service:any;
  service: any;
  services: Service[] = [
    {name: 'Hair Cut'},
    {name: 'Bleech'},
    {name: 'Facial'}
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
 // bookingService = new FormControl();
  //filteredService: Observable<Service[]>;
  customerDet = new FormControl();
  filteredCustomer: Observable<Customer[]>; 
  // constructor( public dialogRef: MatDialogRef<BookingComponent>,
  //   private formBuilder: FormBuilder,
  //   @Inject(MAT_DIALOG_DATA) public data: any) {
  //     // this.filteredService = this.bookingService.valueChanges
  //     // .pipe(
  //     //   startWith(''),
  //     //   map(services => services ? this._filterServices(services) : this.services.slice())
  //     // );
  //     this.filteredCustomer = this.customerDet.valueChanges
  //   .pipe(
  //     startWith(''),
  //     map(customer => customer ? this._filterCustomer(customer) : this.customer.slice())
  //   );
    
  //    }
  constructor(private formBuilder: FormBuilder,) {    
      this.filteredCustomer = this.customerDet.valueChanges
    .pipe(
      startWith(''),
      map(customer => customer ? this._filterCustomer(customer) : this.customer.slice())
    );
    
     }

  ngOnInit() {
    this.bookingForm = new FormGroup({
      customerName: new FormControl(null, Validators.required),
      bookingDate: new FormControl(null, Validators.required),    
      bookingStatus: new FormControl(null),
      service: this.formBuilder.array([this.createService()]),      
      bookingNote: new FormControl(null),
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
      bookingStartTime: new FormControl(),
    });
 }

addService(): void {
  this.service = this.bookingForm.get('service') as FormArray;
  this.service.push(this.createService());
}
Delete(_index) {
  this.service.removeAt(_index);
}
create() {     
  this.bookingForm.controls['customerName'].setValue(this.customerDet.value);   
  Swal.fire('Success');
}

}
