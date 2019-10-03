import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router} from '@angular/router';

export interface Status {
  name: string;
}
export interface empType {
  name: string;
}
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  employeeForm: FormGroup;
  
  empStatus: Status[] = [
    {name: 'Active'},
    {name: 'Inactive'}
];
employeeType: empType[] = [
  {name:'Permanent'},
  {name: 'Contract'},
];

constructor( public router: Router) { }

ngOnInit() {
  
    this.employeeForm = new FormGroup({
      employeeName: new FormControl(null, Validators.required),
      employeeMobile: new FormControl(null, [Validators.required,Validators.pattern('[6-9]\\d{9}')]),
      employeeAltPhone: new FormControl(null,[Validators.required,Validators.pattern('[6-9]\\d{9}')]),
      employeeWhatsAppPhone: new FormControl(null,[Validators.pattern('[6-9]\\d{9}')]),
      employeeEmergencyPhone: new FormControl(null, [Validators.required,Validators.pattern('[6-9]\\d{9}')]),
      employeeEmail: new FormControl(null, Validators.email),      
      employeeDOB: new FormControl(null, Validators.required),
      employeeAnniversaryDate: new FormControl(null),
      employeeStreet1: new FormControl(null),
      employeeStreet2: new FormControl(null),
      employeeCity: new FormControl(null),
      employeeState: new FormControl(null),
      employeePinCode: new FormControl(null),
      employeeAadharNo: new FormControl(null),
      employeeDlNo: new FormControl(null),
      employeeDesignation: new FormControl(null),
      employeeServicesAssigned: new FormControl(null),
      employeeDOJ: new FormControl(null, Validators.required),
      employeeConfirmationDate: new FormControl(null),
      employeeTerminationdate: new FormControl(null),
      employeeRelievingReason: new FormControl(null),
      employeeBloodGroup: new FormControl(null),
      employeeMediclaimNo: new FormControl(null),
      employeeInsuranceNo: new FormControl(null),
      employeeUANNo:new FormControl(null),
      employeeESINo: new FormControl(null),
      employeeType:new FormControl(null),
      employeeContractNo: new FormControl(null),
      employeeContractDate: new FormControl(null),
      employeeStatus: new FormControl(null),
      employeeAadharFile: new FormControl(null),
      employeeDLFile: new FormControl(null),
      employeeResume: new FormControl(null),
      empOtherDoc: new FormControl(null),
      employeeBasicPay: new FormControl(null),
      employeeNote: new FormControl(null)
    })
  }
  dobCheck(event) {
    return false;
  }
  create() {
    
  }
}
