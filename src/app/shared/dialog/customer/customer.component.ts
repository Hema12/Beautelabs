import { Component, OnInit, Inject, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSidenav } from '@angular/material';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';

export interface Staff {
  staffName: string;
}
export interface Source {
  name: string;
}
export interface Customer {
  name:string;
  value:string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @ViewChildren(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  selectedOptions = [];

  selected = this.selectedOptions;
  showError = false;
  errorMessage = '';

  onToggleDropdown() {
    this.multiSelect.toggleDropdown();
  }

  getSelectedOptions(selected) {
    this.selected = selected;
  }

  onResetSelection() {
    this.selectedOptions = [];
  }
  customerForm: FormGroup;
  service:any;
  customer: Customer[] = [
    {name: 'Abhi', value:'Abhi'},
    {name: 'Anandh',value:'Anandh'},
    {name: 'Sruthi',value:'Sruthi'},
    {name:'Ravi',value:'Ravi'}
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
      customerAddon: new FormControl(null),
      addonCustomer: this.formBuilder.array([this.createAddonCustomer()]),      
      customerSource: new FormControl(null)
    });
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
    return this.customer.filter(customername => customername.name.toLowerCase().indexOf(filterValue) === 0 || customername.value.indexOf(filterValue) === 0);
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
