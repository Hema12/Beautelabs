import { Component, OnInit, Inject, TemplateRef, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { RecurPopupComponent } from '../recur-popup/recur-popup.component';
import { filter } from 'minimatch';
import { BillingActivityComponent } from '../billing-activity/billing-activity.component';
import { ServiceComponent } from '../service/service.component';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD MMM-YYYY',
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
  mobile: string;
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
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewBookingComponent implements OnInit {
  selfreq: string;
  selFreqendTime: string;
  showRecur: boolean = true;
  showFreq: boolean = false;
  newBookingForm: FormGroup;
  bookingDate = new FormControl(moment());
  toDay = new Date();
  selDate: any;
  serviceStartTime: any;
  serviceStartMin: any;
  finalDate: any;
  finalTime: any;
  convertDate: any;
  //service:any;
  modalRef: BsModalRef;
  service: any;
  customerHistory: boolean = false;
  serviceTime: any;
  services: Service[] = [
    { name: 'Haircut' },
    { name: 'Facial' },
    { name: 'Waxing' },
    { name: 'Body Polishing' },
    { name: 'Threading' },
    { name: 'Hair Coloring'}
  ];

  source: Source[] = [
    { value: 'Direct - Walkin' },
    { value: 'Facebook' },
    { value: 'Ad Campaign' }
  ];
  customer: Customer[] = [
    { name: 'Abhi', mobile: '9632587412' },
    { name: 'Ramesh Bommiah - 7894561232', mobile: '7894561232' },
    { name: 'Sruthi', mobile: '9764317946' },
    { name: 'Ravi', mobile: '8293714697' }
  ];
  status: Status[] = [
    { value: 'New', viewValue: 'New' },
    { value: 'Arrived', viewValue: 'Customer Arrived' },
    { value: 'Started', viewValue: 'Service Started' },
    { value: 'Completed', viewValue: 'Completed' },
    { value: 'Cancelled', viewValue: 'Cancelled' }
  ];
  startTime: startTime[] = [
    { value: '7:00 AM' },
    { value: '7:30 AM' },
    { value: '8:00 AM' },
    { value: '8:30 AM' },
    { value: '9:00 AM' },
    { value: '9:30 AM' },
    { value: '10:00 AM' },
    { value: '10:30 AM' },
    { value: '11:00 AM' },
    { value: '11:30 AM' },
    { value: '12:00 PM' },
    { value: '12:30 PM' },
    { value: '1:00 PM' },
    { value: '1:30 PM' },
    { value: '2:00 PM' },
    { value: '2:30 PM' },
    { value: '3:00 PM' },
    { value: '3:30 PM' },
    { value: '4:00 PM' },
    { value: '4:30 PM' },
    { value: '5:00 PM' },
    { value: '5:30 PM' },
    { value: '6:00 PM' },
    { value: '6:30 PM' },
    { value: '7:00 PM' },
    { value: '7:30 PM' },
    { value: '8:00 PM' },
    { value: '8:30 PM' },
    { value: '9:00 PM' },
    { value: '9:30 PM' },
    { value: '10:00 PM' }
  ];
  staffs: Staff[] = [
    { value: 'Abhi', viewValue: 'Abhi' },
    { value: 'Deepthi', viewValue: 'Deepthi' },
    { value: 'Devi', viewValue: 'Devi' },
    { value: 'Nisha', viewValue: 'Nisha' },
    { value: 'Nithya', viewValue: 'Nithya' },
    { value: 'Raja', viewValue: 'Raja' },
    { value: 'Ravi', viewValue: 'Ravi' }
  ];
  minDate = new Date();
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
  constructor(private formBuilder: FormBuilder, private active_route: ActivatedRoute, private datePipe: DatePipe,
    private modalService: BsModalService, private dialog: MatDialog, private router: Router, public dialogRef: MatDialogRef<NewBookingComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filteredCustomer = this.customerDet.valueChanges
      .pipe(
        startWith(''),
        map(customer => customer ? this._filterCustomer(customer) : this.customer.slice())
      );
  }

  ngOnInit() {
    this.newBookingForm = new FormGroup({
      customerName: new FormControl(null),
      bookingDate: new FormControl(null),
      bookingStatus: new FormControl(null),
      bookingSource: new FormControl(null),
      service: this.formBuilder.array([this.createService()]),
      bookingNote: new FormControl(null),
    });
    this.selDate = this.active_route.snapshot.params['Seldate'];
   // this.serviceStartTime = this.active_route.snapshot.params['serviceStartTime'];
  //  if(this.data) {
  //   this.serviceStartTime = this.data;  
  //  }

    if (this.selDate) {
      this.finalTime = this.selDate.slice(11, -9);
      this.serviceTime = this.finalTime;
      this.newBookingForm.controls['bookingDate'].setValue(this.selDate);
    }
    if(this.data) {
      console.log(this.data.dt);
      this.newBookingForm.controls['bookingDate'].setValue(this.data.dt);
      let formArr = <FormArray>this.newBookingForm.controls.service;
      formArr.at(0).patchValue({bookingStartTime:this.data.check})
      formArr.at(0).patchValue({bookingService:this.data.title})
      formArr.at(0).patchValue({bookingStaff:this.data.userName})
    }
    
    
    // let formArr = <FormArray>this.newBookingForm.controls.service;
    // formArr.at(0).patchValue({bookingStartTime:this.serviceStartTime})
    // console.log('aa',this.newBookingForm.controls.service.value[0].bookingStartTime);    
    this.newBookingForm.get('bookingStatus').setValue('New');
  }

  private _filterCustomer(value: string): Customer[] {
    const filterValue = value;
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
    this.service = this.newBookingForm.get('service') as FormArray;
    this.service.push(this.createService());
  }

  Delete(_index) {
    this.service.removeAt(_index);
  }
  create() {
    // console.log(this.newBookingForm.getRawValue());
    // console.log('Start', this.newBookingForm.controls.service.value[0].bookingStartTime);
    this.newBookingForm.controls['customerName'].setValue(this.customerDet.value);
    // let formArr = <FormArray>this.newBookingForm.controls.service;
    // formArr.at(0).patchValue({bookingStaff:this.data.check})
    this.dialogRef.close(this.newBookingForm.value);
   // Swal.fire('Success');
  }

  getDisabledValue() {
    return true;
  }
  openRecur() {
    const dialogRef = this.dialog.open(RecurPopupComponent, {
      width: 'col-md-5'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showRecur = false;
      this.selfreq = result.recurFrequency;
      this.selFreqendTime = result.recurEndTime;
      this.showFreq = true;
    });
  }
  openRecurval(freq, endtime) {
    const dialogRef = this.dialog.open(RecurPopupComponent, {
      width: 'col-md-5',
      data: { freq, endtime }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showRecur = false;      

      this.selfreq = freq;
      this.selFreqendTime = endtime;
      this.showFreq = true;
    });
  }

  billingHistory() {
    const dialogRef = this.dialog.open(BillingActivityComponent, {
      width: '95%',
      height: '90%',

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  serviceCreate(): void {
    const dialogRef = this.dialog.open(ServiceComponent, {
      width: 'col-md-7',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  customerAddEdit(val) {
    this.router.navigate(['/beautelabs/cbot-admin/customerCreate', val])
  }

}

