import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface serviceList {
  serviceName: string;
  sno: number;
  servicePrice: string;
  serviceCategory:string;
  staffName: string;
  serviceDate:string;
}

const SERVICE_DATA: serviceList[] = [
  {sno: 1, serviceName: 'Hair Care', serviceCategory: 'KJHGHGFHK34', servicePrice: '1500',serviceDate:'10/10/2018',staffName:'Devi'},
  {sno: 2, serviceName: 'Facial', serviceCategory:'Hair Care',servicePrice: '1200', serviceDate:'05/12/2018',staffName:'Abhi'},
  {sno: 3, serviceName: 'Bleech', serviceCategory: 'KJGHGFHKJI897', servicePrice: '400',serviceDate:'08/03/2019',staffName:'Nithya'},
  {sno: 4, serviceName: 'Pedicure', serviceCategory: 'HJQWDSGWERWFD877', servicePrice: '550',serviceDate:'08/03/2019',staffName:'Riya'},
  {sno: 5, serviceName: 'Hair Coloring', serviceCategory: 'JHHSDGJSGF45', servicePrice: '2500',serviceDate:'25/05/2019',staffName:'Jeya'},
  {sno: 6, serviceName: 'Manicure', serviceCategory: '-', servicePrice: '600',serviceDate:'02/07/2019',staffName:'Aarthi'},
  {sno: 7, serviceName: 'Nail Art', serviceCategory: 'ASDESRFDSFSD3445', servicePrice: '500',serviceDate:'02/07/2019',staffName:'Lakshmi'},
  {sno: 8, serviceName: 'Party Makeup', serviceCategory: 'ASDGSFDSGDGD34', servicePrice: '3000',serviceDate:'18/08/2019',staffName:'Aswini'},
];

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  @HostBinding('@.disabled') disabled = true;
  displayedColumns: string[] = ['sno', 'serviceName', 'serviceDate', 'serviceCategory', 'servicePrice','staffName','action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  serviceSource = new MatTableDataSource(SERVICE_DATA);
  constructor() { }

  ngOnInit() {
    this.serviceSource.paginator = this.paginator;
    this.serviceSource.sort = this.sort;
  }

}
