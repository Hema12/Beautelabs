import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  sno: number;
  mobile: string;
  serviceDate:string;
  totalAmount:string
}
export interface saleService {
  sno: number;
  serviceName: string;
  serviceDate:string;
  staffName:string;
  totalAmount:string
}
const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi',mobile: '9632587412',serviceDate:'10/08/2019',totalAmount:'1,500.00'},
  {sno: 2, name: 'Devi', mobile: '7946132541',serviceDate:'20/07/2019',totalAmount:'800.00'},
  {sno: 3, name: 'Nivetha', mobile: '8293714612',serviceDate:'20/07/2019',totalAmount:'250.00'},
  {sno: 4, name: 'Jeya', mobile: '7391827391',serviceDate:'20/07/2019',totalAmount:'4,500.00'},
  {sno: 5, name: 'Latha', mobile: '9685741245',serviceDate:'20/07/2019',totalAmount:'650.00'},
  {sno: 6, name: 'Karthika', mobile: '7193827391',serviceDate:'20/07/2019',totalAmount:'1,100.00'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',serviceDate:'20/07/2019',totalAmount:'60.00'},
  {sno: 8, name: 'Pradheepa', mobile: '8974654123',serviceDate:'20/07/2019',totalAmount:'850.00'},
  {sno: 9, name: 'Abhinaya', mobile: '7986957454',serviceDate:'20/07/2019',totalAmount:'1,075.00'},
  {sno: 10, name: 'Akshaya', mobile: '9876543214',serviceDate:'20/07/2019',totalAmount:'60.00'},
  {sno: 11, name: 'Aswini', mobile: '8795462134',serviceDate:'20/07/2019',totalAmount:'900.00'}
];

const service_details: saleService[] = [
  {sno: 1, staffName: 'Aadhi',serviceName: 'Hair Cut',serviceDate:'10/08/2019',totalAmount:'350.00'},
  {sno: 2, staffName: 'Devi', serviceName: 'Facial',serviceDate:'20/07/2019',totalAmount:'1100.00'},
  {sno: 3, staffName: 'Nivetha', serviceName: 'Threading',serviceDate:'20/07/2019',totalAmount:'50.00'},
  {sno: 4, staffName: 'Jeya', serviceName: 'Tan Mask',serviceDate:'20/07/2019',totalAmount:'850.00'}
];
@Component({
  selector: 'app-quick-sale',
  templateUrl: './quick-sale.component.html',
  styleUrls: ['./quick-sale.component.scss']
})
export class QuickSaleComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'mobile','serviceDate','totalAmount','action'];
  displayedServiceColumns: string[] = ['sno','serviceDate','serviceName','staffName','totalAmount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  serviceDataSource = new MatTableDataSource(service_details);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  showModal: boolean = false;
  View: any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openViewModal(Value) {   
    this.showModal = true;
    this.View = this.dataSource.filteredData.find(obj => obj.sno === Value.sno);
  }
  hide() {
    this.showModal = false;
  }
  viewSale(val) {
    this.router.navigate(['/beautelabs/cbot-admin/saleCreate', val])
  }
  saleView(val) {
    this.router.navigate(['/beautelabs/cbot-admin/saleView'])
  }
}
