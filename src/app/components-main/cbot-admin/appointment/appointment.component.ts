import { Component, OnInit, ViewChild, TemplateRef, HostBinding } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BookingComponent } from 'src/app/shared/dialog/booking/booking.component';
import Swal from 'sweetalert2';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGrid from '@fullcalendar/resource-timegrid';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
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
  @HostBinding('@.disabled') disabled = true;
  public eventMarkers: any;
  taskfield:any;
  displayedColumns: string[] = ['sno', 'name', 'mobile','totalCount','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  animal: string;
  name: string;
  @ViewChild(FullCalendarComponent, {static: true}) calendarComponent: FullCalendarComponent;  
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, resourceTimeGrid];
  calendarWeekends = true;
  resourceText: string;
  resources: any;
  events: any;
  todayDate = new Date();
  slotDuration: any; 
  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  // gotoPast() {
  //   let calendarApi = this.calendarComponent.getApi();
  //   calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  // }

  handleDateClick(arg) {
    this.router.navigate(['/beautelabs/cbot-admin/bookingCreate', { Seldate: arg.dateStr }]);

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
   constructor(private modalService: BsModalService, public dialog: MatDialog, public router: Router) { }
  // constructor(private modalService: BsModalService) { }

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
    console.log(this.todayDate);
    this.initFunction();
}
initFunction() {
  this.resourceText = "Timings";
  this.slotDuration = "00:15:00";
  this.resources = [
    {id:'1',title:'Devi'},
    {id:'2',title:'Ramya'},
    {id:'3',title:'Nithya'},
    {id:'4',title:'Ashika'},
    {id:'5',title:'Ravi'},
  ];  
  this.events = [
    { title: 'Hair Cut - Devi - 10:00 AM', start: new Date(), backgroundColor:'#f00'},
    { title: 'Bleech - Devi - 10:45 AM', start: new Date(), backgroundColor:'#9fb3d4' },
    { title: 'Facial - Nithya - 11:30 AM', start: new Date('2019-10-06'), backgroundColor:'#407d5d' },
    { title: 'Hair Coloring - Abhi - 03:00 PM', start: new Date('2019-10-04'), backgroundColor:'#34cf7d' }
  ]; 
  resources:'Resouces'
}
}
