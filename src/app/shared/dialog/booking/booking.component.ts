import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {DateAdapter} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';
import { getTime } from 'ngx-bootstrap/chronos/utils/date-getters';
import { DatePipe } from '@angular/common';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
export interface startTime {
  value: string;
}
export interface State {
  name: string;
}
export interface Source {
  value: string;
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  bookingDate = new FormControl(moment());
  toDay = new Date();
  selDate: any;
  finalDate: any;
  finalTime:any;
  convertDate: any;
  //service:any;
  service: any;
  customerHistory : boolean = false;
  serviceTime:any;
  services: Service[] = [
    {name: 'Hair Cut'},
    {name: 'Bleech'},
    {name: 'Facial'}
  ];
  source: Source[] = [
    {value: 'Direct - Walkin'},
    {value: 'Facebook'},
    {value: 'Ad Campaign'}
  ];
  customer: Customer[] = [
    {name: 'Abhi', mobile:'9632587412'},
    {name: 'Ramesh Bommiah - 7894561232',mobile:'7894561232'},
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
  startTime: startTime[] = [
    {value: '12:00am'},
    {value: '12:05am'},
    {value: '12:10am'},
    {value: '12:15am'},
    {value: '12:20am'},
    {value: '12:25am'},
    {value: '12:30am'},
    {value: '12:35am'},
    {value: '12:40am'},
    {value: '12:45am'},
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
  constructor(private formBuilder: FormBuilder,private active_route: ActivatedRoute,private datePipe : DatePipe) {    
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
      bookingSource: new FormControl(null),
      service: this.formBuilder.array([this.createService()]),      
      bookingNote: new FormControl(null),
    });
    this.selDate = this.active_route.snapshot.params['Seldate'];  
    this.finalTime = this.selDate.slice(11,-9);
    this.serviceTime = this.finalTime ;
    this.convertDate = this.datePipe.transform(this.selDate, 'MM-dd-yyyy');
    console.log(this.convertDate);
    this.bookingForm
    this.bookingForm.controls['bookingDate'].setValue(this.selDate);
    this.bookingForm.get('bookingStatus').setValue('New');
  }

  private _filterCustomer(value: string): Customer[] {
    const filterValue = value;       
    console.log(filterValue);
    this.customerHistory = true;
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

getDisabledValue() {

  return true; 
}
}
