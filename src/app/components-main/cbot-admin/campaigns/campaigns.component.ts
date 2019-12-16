import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';

export interface campaignData {
  name: string;
  createDate:string;
  count:string
}

const CAMPAIGN_DATA: campaignData[] = [
  {name: 'Welcome Message',createDate:'10/08/2019',count:'50'},
  {name: 'Discount Campaign', createDate:'20/07/2019',count:'20'},
  {name: 'Newsletter Subscription',createDate:'20/07/2019',count:'110'},
  {name: 'Regular Customers', createDate:'20/07/2019',count:'75'},
  {name: 'CRM Leads', createDate:'20/07/2019',count:'45'},
  {name: 'Event Inveites', createDate:'20/07/2019',count:'87'}
];
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'createDate','count', 'action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);  
  campaignData: Observable<any>;
  dataSource: MatTableDataSource<campaignData> = new MatTableDataSource<campaignData>(CAMPAIGN_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.campaignData = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
