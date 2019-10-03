import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  name: string;
  sno: number;
  mobile: string;
  serviceDate:string;
  serviceName:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi',mobile: '9632587412',serviceDate:'10/08/2019',serviceName:'Hair care'},
  {sno: 2, name: 'Devi', mobile: '7946132541',serviceDate:'20/07/2019',serviceName:'Facial'},
  {sno: 3, name: 'Nivetha', mobile: '8293714612',serviceDate:'20/07/2019',serviceName:'Bleech'},
  {sno: 4, name: 'Jeya', mobile: '7391827391',serviceDate:'20/07/2019',serviceName:'Pedicure'},
  {sno: 5, name: 'Latha', mobile: '9685741245',serviceDate:'20/07/2019',serviceName:'Manicure'},
  {sno: 6, name: 'Karthika', mobile: '7193827391',serviceDate:'20/07/2019',serviceName:'Hair Coloring'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',serviceDate:'20/07/2019',serviceName:'Threading'},
  {sno: 8, name: 'Pradheepa', mobile: '8974654123',serviceDate:'20/07/2019',serviceName:'Threading'},
  {sno: 9, name: 'Abhinaya', mobile: '7986957454',serviceDate:'20/07/2019',serviceName:'Hair Spa'},
  {sno: 10, name: 'Akshaya', mobile: '9876543214',serviceDate:'20/07/2019',serviceName:'Facial'},
  {sno: 11, name: 'Aswini', mobile: '8795462134',serviceDate:'20/07/2019',serviceName:'Threading'}
];

@Component({
  selector: 'app-store-locations',
  templateUrl: './store-locations.component.html',
  styleUrls: ['./store-locations.component.scss']
})
export class StoreLocationsComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'mobile','serviceDate','serviceName','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
