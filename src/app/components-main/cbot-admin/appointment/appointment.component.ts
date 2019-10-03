import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BookingComponent } from 'src/app/shared/dialog/booking/booking.component';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  sno: number;
  mobile: string;
  totalCount:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi',mobile: '9632587412',totalCount:'3'},
  {sno: 2, name: 'Devi', mobile: '7946132541',totalCount:'2'},
  {sno: 3, name: 'Hari', mobile: '8293714612',totalCount:'1'},
  {sno: 4, name: 'Jai', mobile: '7391827391',totalCount:'4'},
  {sno: 5, name: 'Latha', mobile: '9685741245',totalCount:'1'},
  {sno: 6, name: 'Karthi', mobile: '7193827391',totalCount:'6'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',totalCount:'1'},
  {sno: 8, name: 'Prakash', mobile: '8974654123',totalCount:'8'},
  {sno: 9, name: 'Abhinaya', mobile: '7986957454',totalCount:'3'},
  {sno: 10, name: 'Kumar', mobile: '9876543214',totalCount:'2'},
  {sno: 11, name: 'Ravi', mobile: '8795462134',totalCount:'2'},
  {sno: 12, name: 'Nithya', mobile: '9678125432',totalCount:'3'},
  {sno: 13, name: 'Anbu', mobile: '7684957545',totalCount:'4'},
  {sno: 14, name: 'Sasi', mobile: '9283714565',totalCount:'6'},
  {sno: 15, name: 'Zenath', mobile: '9879784564',totalCount:'6'}
];
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  public data: Object[];
  public eventMarkers: any;
  taskfield:any;
  displayedColumns: string[] = ['sno', 'name', 'mobile','totalCount','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
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
 
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
       {
           ticks: {
             min: 1,
             max: 24,
             stepSize: 1,
             beginAtZero:true,
             
           },
           gridLines: {
                 offsetGridLines: false
             }
       }
     ],
   }
  };
  public barChartLabels: Label[] = ['Aadhi', 'Devi', 'Jai', 'Hari', 'Nithya', 'Karthi', 'Zenath'];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(30,144,255,0.3)',
    },
  ];
  public barChartData: ChartDataSets[] = [
    { data: [9, 8, 10, 11, 7, 6, 5], label: '' },
    { data: [9, 8, 10, 11, 7, 6, 5], label: '' },
    { data: [9, 8, 10, 5], label: '' }
  ];

  // constructor(private modalService: BsModalService, public dialog: MatDialog) { }
  constructor(private modalService: BsModalService) { }

  // appointmentCreate(): void {
  //   const dialogRef = this.dialog.open(BookingComponent, {
  //     width: '50%',
  //     data: { }
  //     // data: {name: 'sfd', animal: 'dsfd'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
      
  //     this.modalRef.hide();
  //   });
  // }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.eventMarkers = [{
      day: '04/04/2019',
      time:'9.00AM',
      label: 'Research phase'
  }];
    this.data = [{
      TaskID: 1,
      TaskName: 'Service1',
      startTime:'9:00AM',
      endTime:'10:00AM',
      StartDate: new Date(),
      EndDate: new Date(),
      subtasks: [{
          TaskID: 2,
          TaskName: 'Defining the product and its usage',
          StartDate: new Date('04/02/2019'),
          Duration: 5,
          Progress: 30
      },
    ]}, 
  {
    TaskID: 2,
    TaskName: 'Service2',
    startTime:'9:00AM',
    endTime:'10:00AM',
    StartDate: new Date(),
    EndDate: new Date(),
}, 
];
  this.taskfield = {
      id: 'TaskID',
      name: 'TaskName',
      startTime:'startTime',
      startDate: 'StartDate',
      endTime: 'endTime',
      endDate: 'EndDate',
      child: 'subtasks'
  };

  // Am Charts
}
}
