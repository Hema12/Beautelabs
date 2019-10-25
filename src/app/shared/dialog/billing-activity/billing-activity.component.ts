import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

export interface billDetails {
  sno: number;
  billNo: string;
  billDate:string;
  billTotal:string;
  branch:string;
  source: string;
}

const bill_details: billDetails[] = [
  {sno: 1, billNo: '1725',billDate: '18/10/2019',billTotal:'2,500.00',branch:'Ganapathy',source:'Direct-walkin'},
  {sno: 2, billNo: '1598', billDate: '21/09/2019',billTotal:'500.00',branch:'Ganapathy',source:'Phone'},
  {sno: 3, billNo: '1501', billDate: '15/08/2019',billTotal:'1,400.00',branch:'Ganapathy',source:'Facebook'},
  {sno: 4, billNo: '1467', billDate: '02/08/2019',billTotal:'800.00',branch:'Ganapathy',source:'Direct-walkin'},
  {sno: 5, billNo: '1344', billDate: '29/06/2019',billTotal:'1,800.00',branch:'Ganapathy',source:'Phone'},
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

  displayedColumns: string[] = ['billNo','billDate','billTotal','branch'];
  displayedServiceColumns: string[] = ['sno','serviceName','staffName','billTotal'];
  dataSource = new MatTableDataSource(bill_details);
  serviceList = new MatTableDataSource(service_details);
  View:any;
  billDetail:any;
  firstRow: number = 1;
  isShow: boolean = false;
  selectedRowIndex: number;
  screenWidth: number;  
  highlighted: boolean = false;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  showModal: boolean = false;
  constructor( public dialogRef: MatDialogRef<BillingActivityComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {  
      this.selectedRowIndex = 1;      
     }

  ngOnInit() {
    this.screenWidth$.subscribe(width => {
      this.screenWidth = width;
    });
    this.billDetail = this.dataSource;
    this.openFirstRec(this.firstRow);
    
  }
  openFirstRec(rowval) {
    this.isShow = true;
    this.View = this.billDetail.filteredData.find(obj => rowval);   
  }
  close() {
    this.dialogRef.close();
  }
  openBill(val) {    
    this.selectedRowIndex = val.sno;
    this.highlighted = !this.highlighted;    
    this.isShow = true;
    this.showModal = true;    
    this.View = this.billDetail.filteredData.find(obj => obj.sno === val.sno);   
  }
  hide() {
    this.showModal = false;
  }
}
