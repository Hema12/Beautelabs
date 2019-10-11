import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';


export interface recurFrequency {
  value: string;
}
export interface recurEndTime {
  value: string;
}

@Component({
  selector: 'app-recur-popup',
  templateUrl: './recur-popup.component.html',
  styleUrls: ['./recur-popup.component.scss']
})
export class RecurPopupComponent implements OnInit {
  recurForm: FormGroup;
  selFrequency: boolean = false;
  selFrequencyValue: string;
  recurFrequency: recurFrequency[] = [
    {value: 'Doesn\'t repeat'},
    {value: 'Daily'},
    {value: 'Every 2 days'},
    {value: 'Every 3 days'},
    {value: 'Every 4 days'},
    {value: 'Every 5 days'},
    {value: 'Every 6 days'},
    {value: 'Every 7 days'},
    {value: 'Weekly'}
  ];  
  recurEnd: recurEndTime[] = [
    {value: 'After 2 times'},
    {value: 'After 3 times'},
    {value: 'After 4 times'},
    {value: 'After 5 times'},
    {value: 'After 6 times'},
    {value: 'After 7 times'},
    {value: 'After 8 times'},
    {value: 'After 9 times'},
    {value: 'After 10 times'},
    {value: 'Specific Date'},
    {value: 'Ongoing'},
  ];
  constructor( public dialogRef: MatDialogRef<RecurPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.recurForm = new FormGroup({
      recurFrequency: new FormControl(null),
      recurEndTime: new FormControl(null),
      recurSpecificDate: new FormControl(null)
    })
  }

  getFrequency(value) {    
    this.selFrequency = true;
  }
  getFrequencyEnd(val) {
    this.selFrequencyValue = val;    
  }
  submit() {
    this.dialogRef.close();
  }
}
