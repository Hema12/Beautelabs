import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  name: string;
  sno: number;
  mobile: string;
  serviceDate:string;
  poBill: string;
  address: string;
  amount: string;
  status: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi',mobile: '9632587412',serviceDate:'10/08/2019', poBill:'1214', address:'Coimbatore', amount:'4,000', status: 'Paid'},
  {sno: 2, name: 'Devi', mobile: '7946132541',serviceDate:'20/07/2019', poBill:'1218', address:'Coimbatore', amount:'5,500', status: 'Unpaid'},
  {sno: 3, name: 'Nivetha', mobile: '8293714612',serviceDate:'20/07/2019', poBill:'1241', address:'Coimbatore', amount:'3,400', status: 'Paid'},
  {sno: 4, name: 'Jeya', mobile: '7391827391',serviceDate:'20/07/2019', poBill:'1247', address:'Coimbatore', amount:'2,700', status: 'Paid'},
  {sno: 5, name: 'Latha', mobile: '9685741245',serviceDate:'20/07/2019', poBill:'1259', address:'Coimbatore', amount:'8,900', status: 'Unpaid'},
  {sno: 6, name: 'Karthika', mobile: '7193827391',serviceDate:'20/07/2019', poBill:'1265', address:'Coimbatore', amount:'12,000', status: 'Paid'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',serviceDate:'20/07/2019', poBill:'1267', address:'Coimbatore', amount:'6,500', status: 'Paid'},
  {sno: 8, name: 'Pradheepa', mobile: '8974654123',serviceDate:'20/07/2019', poBill:'1270', address:'Coimbatore', amount:'17,500', status: 'Paid'},
  {sno: 9, name: 'Abhinaya', mobile: '7986957454',serviceDate:'20/07/2019', poBill:'1284', address:'Coimbatore', amount:'3,400', status: 'Unpaid'},
  {sno: 10, name: 'Akshaya', mobile: '9876543214',serviceDate:'20/07/2019', poBill:'1289', address:'Coimbatore', amount:'6,900', status: 'Paid'},
  {sno: 11, name: 'Aswini', mobile: '8795462134',serviceDate:'20/07/2019', poBill:'1293', address:'Coimbatore', amount:'2,100', status: 'Unpaid'}
];
@Component({
  selector: 'app-purchase-bill',
  templateUrl: './purchase-bill.component.html',
  styleUrls: ['./purchase-bill.component.scss']
})
export class PurchaseBillComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'poBill', 'name', 'mobile', 'address', 'serviceDate','amount', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
