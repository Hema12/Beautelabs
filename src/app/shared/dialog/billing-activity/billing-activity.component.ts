import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';

export interface billDetails {
  sno: number;
  billNo: string;
  billDate:string;
  billTotal:string;
  branch:string;
}

const ELEMENT_DATA: billDetails[] = [
  {sno: 1, billNo: '1725',billDate: '18/10/2019',billTotal:'2500',branch:'Ganapathy'},
  {sno: 2, billNo: '1598', billDate: '21/09/2019',billTotal:'500',branch:'Ganapathy'},
  {sno: 3, billNo: '1501', billDate: '15/08/2019',billTotal:'1400',branch:'Ganapathy'},
  {sno: 4, billNo: '1467', billDate: '02/08/2019',billTotal:'800',branch:'Ganapathy'},
  {sno: 5, billNo: '1344', billDate: '29/06/2019',billTotal:'1800',branch:'Ganapathy'},
];
@Component({
  selector: 'app-billing-activity',
  templateUrl: './billing-activity.component.html',
  styleUrls: ['./billing-activity.component.scss']
})
export class BillingActivityComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'billNo', 'billDate','billTotal','branch','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  View:any;
  billDetail:any;
  isShow = false;
  constructor( public dialogRef: MatDialogRef<BillingActivityComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.billDetail = this.dataSource;
  }

  close() {
    this.dialogRef.close();
  }
  openBill(val) {
    this.isShow = true;
    console.log(val);
    //this.View = this.billDetail.find(obj=>obj.sno === val.sno);
    this.View = this.billDetail.filteredData.find(obj => obj.sno === val.sno);   
  }
}
