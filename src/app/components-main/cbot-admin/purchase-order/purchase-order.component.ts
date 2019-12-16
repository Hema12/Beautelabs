import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  name: string;
  sno: number;
  mobile: string;
  serviceDate:string;
  poNumber:string;
  address: string;
  amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi',mobile: '9632587412',serviceDate:'10/08/2019',poNumber:'1542',address:'Coimbatore',amount:'4,000'},
  {sno: 2, name: 'Devi', mobile: '7946132541',serviceDate:'20/07/2019',poNumber:'1546',address:'Coimbatore',amount:'5,500'},
  {sno: 3, name: 'Nivetha', mobile: '8293714612',serviceDate:'20/07/2019',poNumber:'1645',address:'Coimbatore',amount:'7,800'},
  {sno: 4, name: 'Jeya', mobile: '7391827391',serviceDate:'20/07/2019',poNumber:'1687',address:'Coimbatore',amount:'2,500'},
  {sno: 5, name: 'Latha', mobile: '9685741245',serviceDate:'20/07/2019',poNumber:'1689',address:'Coimbatore',amount:'1,200'},
  {sno: 6, name: 'Karthika', mobile: '7193827391',serviceDate:'20/07/2019',poNumber:'1702',address:'Coimbatore',amount:'9,500'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',serviceDate:'20/07/2019',poNumber:'1741',address:'Coimbatore',amount:'11,000'},
  {sno: 8, name: 'Pradheepa', mobile: '8974654123',serviceDate:'20/07/2019',poNumber:'1748',address:'Coimbatore',amount:'15,000'},
  {sno: 9, name: 'Abhinaya', mobile: '7986957454',serviceDate:'20/07/2019',poNumber:'1751',address:'Coimbatore',amount:'8,700'},
  {sno: 10, name: 'Akshaya', mobile: '9876543214',serviceDate:'20/07/2019',poNumber:'1759',address:'Coimbatore',amount:'3,600'},
  {sno: 11, name: 'Aswini', mobile: '8795462134',serviceDate:'20/07/2019',poNumber:'1768',address:'Coimbatore',amount:'9,400'}
];
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'poNumber', 'name', 'address', 'mobile','serviceDate', 'amount', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
