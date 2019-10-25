import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatCard } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { Router } from '@angular/router';

export interface customerData {
  name: string;
  sno: number;
  email: string;
  mobile: string;
  purchaseValue: string;
  visitCount:string;
  lastVisit: string;
  membership:boolean;
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

const CUSTOMER_DATA: customerData[] = [
  {sno: 1, name: 'Aadhi', email: 'aashi@gmail.com', mobile: '9632587412',purchaseValue:'3500',visitCount:'3', lastVisit:'12.05.2018',membership:true},
  {sno: 2, name: 'Devi', email: 'devi@gmail.com', mobile: '7946132541',purchaseValue:'2800',visitCount:'2', lastVisit:'09.03.2018',membership:false},
  {sno: 3, name: 'Hari', email: 'hari56@gmail.com', mobile: '8293714612',purchaseValue:'1200',visitCount:'1', lastVisit:'18.07.2018',membership:false},
  {sno: 4, name: 'Jai', email: 'jai23@gmail.com', mobile: '7391827391',purchaseValue:'7900',visitCount:'4', lastVisit:'07.09.2018',membership:false},
  {sno: 5, name: 'Latha', email: 'latha23@gmail.com', mobile: '9685741245',purchaseValue:'1600',visitCount:'1', lastVisit:'01.09.2018',membership:false},
  {sno: 6, name: 'Karthi', email: 'karthiaa@gmail.com', mobile: '7193827391',purchaseValue:'9300',visitCount:'6', lastVisit:'25.05.2018',membership:true},
  {sno: 7, name: 'Nisha', email: 'nishasr@gmail.com', mobile: '9176947845',purchaseValue:'800',visitCount:'1', lastVisit:'20.01.2018',membership:false},
  {sno: 8, name: 'Prakash', email: 'prakashuy@gmail.com', mobile: '8974654123',purchaseValue:'15200',visitCount:'8', lastVisit:'27.02.2018',membership:false},
  {sno: 9, name: 'Abhinaya', email: 'abhiemp@gmail.com', mobile: '7986957454',purchaseValue:'3500',visitCount:'3', lastVisit:'12.05.2018',membership:false},
  {sno: 10, name: 'Kumar', email: 'kumar24@gmail.com', mobile: '9876543214',purchaseValue:'2800',visitCount:'2', lastVisit:'09.03.2018',membership:true},
  {sno: 11, name: 'Ravi', email: 'ravipoe@gmail.com', mobile: '8795462134',purchaseValue:'3700',visitCount:'2', lastVisit:'18.07.2018',membership:false},
  {sno: 12, name: 'Nithya', email: 'nithyalkj@gmail.com', mobile: '9678125432',purchaseValue:'7900',visitCount:'3', lastVisit:'07.09.2018',membership:false},
  {sno: 13, name: 'Anbu', email: 'anbu76@gmail.com', mobile: '7684957545',purchaseValue:'6200',visitCount:'4', lastVisit:'01.09.2018',membership:false},
  {sno: 14, name: 'Sasi', email: 'sasi87@gmail.com', mobile: '9283714565',purchaseValue:'4600',visitCount:'6', lastVisit:'25.05.2018',membership:false},
  {sno: 15, name: 'Zenath', email: 'zenath@gmail.com', mobile: '9879784564',purchaseValue:'5400',visitCount:'6', lastVisit:'20.01.2018',membership:false}
];
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  toggleActive:boolean = false;
  displayedColumns: string[] = ['sno', 'name', 'email', 'mobile','purchaseValue','visitCount','lastVisit','action'];
  customerData: Observable<any>;
  dataSource: MatTableDataSource<customerData> = new MatTableDataSource<customerData>(CUSTOMER_DATA);
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  animal: string;
  name: string;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  constructor(private modalService: BsModalService, public dialog: MatDialog, private sidenav: SidenavService, private router: Router) { }



  ngOnInit() {
    this.customerData = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    console.log(this.toggleActive);
    
    this.sidenav.toggle();
  }

  customerAddEdit(val) {        
    this.router.navigate(['/beautelabs/cbot-admin/customerCreate', val])
  }


}
