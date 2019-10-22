import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';

export interface billDetails {
  sno: number;
  billNo: string;
  billDate:string;
  billTotal:string;
  branch:string;
}

const bill_details: billDetails[] = [
  {sno: 1, billNo: '1725',billDate: '18/10/2019',billTotal:'2500',branch:'Ganapathy'},
  {sno: 2, billNo: '1598', billDate: '21/09/2019',billTotal:'500',branch:'Ganapathy'},
  {sno: 3, billNo: '1501', billDate: '15/08/2019',billTotal:'1400',branch:'Ganapathy'},
  {sno: 4, billNo: '1467', billDate: '02/08/2019',billTotal:'800',branch:'Ganapathy'},
  {sno: 5, billNo: '1344', billDate: '29/06/2019',billTotal:'1800',branch:'Ganapathy'},
];

export interface billServiceDetails {
  sno: number;
  serviceName: string;
  staffName:string;
  billTotal:string;
}

const service_details: billServiceDetails[] = [
  {sno: 1, serviceName: 'Hair Cut',staffName: 'Devi',billTotal:'250'},
  {sno: 2, serviceName: 'Threading', staffName: 'Nisha',billTotal:'50'},
  {sno: 3, serviceName: 'Facial', staffName: 'Devi',billTotal:'1425'}
];
@Component({
  selector: 'app-billing-activity',
  templateUrl: './billing-activity.component.html',
  styleUrls: ['./billing-activity.component.scss']
})
export class BillingActivityComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'billNo', 'billDate','billTotal','branch','action'];
  displayedServiceColumns: string[] = ['sno','serviceName','staffName','billTotal'];
  dataSource = new MatTableDataSource(bill_details);
  serviceList = new MatTableDataSource(service_details);
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
    this.View = this.billDetail.filteredData.find(obj => obj.sno === val.sno);   
  }
}
