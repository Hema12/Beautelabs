import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  sno: number;
  billNo: string;
  mobile: string;
  billDate:string;
  totalAmount:string;
  source:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi',mobile: '9632587412',billNo:'1725',billDate:'10/08/2019',totalAmount:'1,500.00',source:'Direct-walkin'},
  {sno: 2, name: 'Devi', mobile: '7946132541',billNo:'1825',billDate:'20/07/2019',totalAmount:'800.00',source:'Phone'},
  {sno: 3, name: 'Nivetha', mobile: '8293714612',billNo:'1828',billDate:'20/07/2019',totalAmount:'250.00',source:'Direct-walkin'},
  {sno: 4, name: 'Jeya', mobile: '7391827391',billNo:'1927',billDate:'20/07/2019',totalAmount:'4,500.00',source:'Direct-walkin'},
  {sno: 5, name: 'Latha', mobile: '9685741245',billNo:'1936',billDate:'20/07/2019',totalAmount:'650.00',source:'Phone'},
  {sno: 6, name: 'Karthika', mobile: '7193827391',billNo:'1954',billDate:'20/07/2019',totalAmount:'1,100.00',source:'Facebook'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',billNo:'1978',billDate:'20/07/2019',totalAmount:'60.00',source:'Direct-walkin'},
  {sno: 8, name: 'Pradheepa', mobile: '8974654123',billNo:'1988',billDate:'20/07/2019',totalAmount:'850.00',source:'Direct-walkin'},
  {sno: 9, name: 'Abhinaya', mobile: '7986957454',billNo:'1996',billDate:'20/07/2019',totalAmount:'1,075.00',source:'Direct-walkin'},
  {sno: 10, name: 'Akshaya', mobile: '9876543214',billNo:'2002',billDate:'20/07/2019',totalAmount:'60.00',source:'Direct-walkin'},
  {sno: 11, name: 'Aswini', mobile: '8795462134',billNo:'2015',billDate:'20/07/2019',totalAmount:'900.00',source:'Direct-walkin'}
];


@Component({
  selector: 'app-quick-sale',
  templateUrl: './quick-sale.component.html',
  styleUrls: ['./quick-sale.component.scss']
})
export class QuickSaleComponent implements OnInit {
  displayedColumns: string[] = ['billNo','billDate', 'name', 'mobile','totalAmount'];
  displayedServiceColumns: string[] = ['sno','serviceDate','serviceName','staffName','totalAmount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  showModal: boolean = false;
  View: any;
  billDetail: any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.billDetail = this.dataSource;
  }
  openViewModal(Value) {   
    this.showModal = true;
    this.View = this.billDetail.filteredData.find(obj => obj.sno === Value.sno);   
    
  }
  hide() {
    this.showModal = false;
  }
  createSale(val) {
    this.router.navigate(['/beautelabs/cbot-admin/saleCreate', val])
  }

}
