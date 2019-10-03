import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSidenav } from '@angular/material';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface Staff {
  staffName: string;
}
export interface Source {
  name: string;
}
export interface Customer {
  name:string;
  mobile:string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  service:any;
  customer: Customer[] = [
    {name: 'Abhi', mobile:'9632587412'},
    {name: 'Anandh',mobile:'7894561232'},
    {name: 'Sruthi',mobile:'9764317946'},
    {name:'Ravi',mobile:'8293714697'}
  ];
  customerDet = new FormControl();
  filteredCustomer: Observable<Customer[]>; 

  staff: Staff[] = [
    {staffName: 'Aadhi'},
    {staffName: 'Devi'},
    {staffName: 'Jai'},
    {staffName:'Hari'},
    {staffName: 'Nithya'}
  ];

  source: Source[] = [
    {name: 'Direct-walkin'},
    {name: 'Facebook'},
    {name: 'Phone'},
    {name:'Promotions'}
  ];
  constructor( private formBuilder: FormBuilder,
    ) {
      this.filteredCustomer = this.customerDet.valueChanges
      .pipe(
        startWith(''),
        map(customer => customer ? this._filterCustomer(customer) : this.customer.slice())
      );
     }

  ngOnInit() {
    this.customerForm = new FormGroup({
      customerName: new FormControl(null, Validators.required),
      customerMobile: new FormControl(null, [Validators.required,Validators.pattern('[6-9]\\d{9}')]),
      customerAltPhone: new FormControl(null,[Validators.pattern('[6-9]\\d{9}')]),
      customerWhatsappPhone: new FormControl(null,[Validators.pattern('[6-9]\\d{9}')]),
      customerEmail: new FormControl(null, [Validators.required, Validators.email]),
      customerDob: new FormControl(null),
      customerAnniversary: new FormControl(null),
      customerGroupName: new FormControl(null),
      gender: new FormControl(null),
      customerStreet1: new FormControl(null, Validators.required),
      customerStreet2: new FormControl(null),
      customerCity: new FormControl(null, Validators.required),
      customerState: new FormControl(null, Validators.required),
      customerPinCode: new FormControl(null, [Validators.required,Validators.pattern('[1-9]\\d{5}')]),
      customerDNDStatus: new FormControl(null),
      customerGSTApplicable: new FormControl(null),
      customerCompanyName: new FormControl(null),
      customerGSTNumber: new FormControl(null),
      customerPreferredStaff: new FormControl(null),
      customerNote: new FormControl(null),
      addonCustomer: this.formBuilder.array([this.createAddonCustomer()]),      
      customerSource: new FormControl(null)
    })
  }
  dobCheck(event) {
    return false;
  }
  clearForm() {    
        this.customerForm.setValue({customerName: '', customerMobile: '', customerEmail: '', customerLocation: '', customerDob:'',customerAnniversary: '',gender:'',customerAddress:'',customerNote:'',customerSource:''});
        this.customerForm.updateValueAndValidity();
  }

  // cloesModal() {
  //   this.dialogRef.close();
  // }
  private _filterCustomer(value: string): Customer[] {
    const filterValue = value;            
    return this.customer.filter(customername => customername.name.toLowerCase().indexOf(filterValue) === 0 || customername.mobile.indexOf(filterValue) === 0);
  }
  createAddonCustomer(): FormGroup {
    return this.formBuilder.group({
      bookingService: new FormControl(),
      bookingStaff: new FormControl(),
      bookingStartTime: new FormControl(),
    });
 }

 addAddonCustomer(): void {
  this.service = this.customerForm.get('addonCustomer') as FormArray;
  this.service.push(this.createAddonCustomer());
}
Delete(_index) {
  this.service.removeAt(_index);
}

}
