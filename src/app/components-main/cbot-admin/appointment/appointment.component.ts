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
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Router } from '@angular/router';
import { DateTime, Info } from 'luxon';
import moment from 'moment';
import { RecurPopupComponent } from 'src/app/shared/dialog/recur-popup/recur-popup.component';

export interface PeriodicElement {
  name: string;
  sno: number;
  mobile: string;
  serviceName:string;
  staffName:string;
  startTime:string;
  serviceDuration:string;
  servicePrice: string;
  status: string;
  source:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Meera',mobile: '9632587412',serviceName:'Glow Mask Facial',staffName:'Aadhi',startTime:'09:00',serviceDuration:'01:00',servicePrice:'1,500',status:'Arrived',source:'Phone'},
  {sno: 2, name: 'Nila', mobile: '7946132541',serviceName:'Tan Mask',staffName:'Devi',startTime:'09:45',serviceDuration:'00:45',servicePrice:'800',status:'Arrived',source:'Direct'},
  {sno: 3, name: 'Naveen', mobile: '8293714612',serviceName:'Hair Cut',staffName:'Hari',startTime:'09:10',serviceDuration:'00:30',servicePrice:'120',status:'Arrived',source:'Phone'},
  {sno: 4, name: 'Hema', mobile: '7391827391',serviceName:'Bleech and Facial',staffName:'Latha',startTime:'10:00',serviceDuration:'01:30',servicePrice:'2,000',status:'Arrived',source:'Direct'},
  {sno: 5, name: 'Jai', mobile: '9685741245',serviceName:'Hair Cut',staffName:'Karthi',startTime:'10:30',serviceDuration:'00:20',servicePrice:'200',status:'booked',source:'Phone'},
  {sno: 6, name: 'SasiKumar', mobile: '7193827391',serviceName:'Threading',staffName:'Nisha',startTime:'09:50',serviceDuration:'00:15',servicePrice:'50',status:'Arrived',source:'Phone'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',serviceName:'Hair Cut',staffName:'Aadhi',startTime:'10:30',serviceDuration:'00:30',servicePrice:'200',status:'booked',source:'Direct'},
  {sno: 8, name: 'Latha', mobile: '8974654123',serviceName:'Threading',staffName:'Devi',startTime:'11:00',serviceDuration:'00:15',servicePrice:'50',status:'booked',source:'Phone'},
  {sno: 9, name: 'Ravi', mobile: '7986957454',serviceName:'Facial',staffName:'Karthi',startTime:'12:10',serviceDuration:'00:40',servicePrice:'1,300',status:'booked',source:'Facebook'},
  {sno: 10, name: 'Abhinaya', mobile: '9876543214',serviceName:'Party Makeup',staffName:'Nisha',startTime:'11:15',serviceDuration:'02:00',servicePrice:'4,500',status:'booked',source:'Website'},
  {sno: 11, name: 'Zenath', mobile: '8795462134',serviceName:'Threading',staffName:'Devi',startTime:'12:30',serviceDuration:'00:15',servicePrice:'50',status:'booked',source:'Phone'},
  {sno: 12, name: 'Nithya', mobile: '9678125432',serviceName:'Threading',staffName:'Nisha',startTime:'12:45',serviceDuration:'00:15',servicePrice:'50',status:'booked',source:'Phone'},
  {sno: 13, name: 'Anbu', mobile: '7684957545',serviceName:'Hair Cut',staffName:'Sasi',startTime:'09:50',serviceDuration:'00:20',servicePrice:'120',status:'Arrived',source:'Phone'},
  {sno: 14, name: 'Sasi', mobile: '9283714565',serviceName:'Facial',staffName:'Prakash',startTime:'09:20',serviceDuration:'01:00',servicePrice:'700',status:'Arrived',source:'Phone'},
];
export interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  public calicon:any;
  public selIcon:string;
  public calString: string;
  public data: Object[];
  @HostBinding('@.disabled') disabled = true;
  public eventMarkers: any;
  taskfield:any;
  displayedColumns: string[] = ['sno', 'name', 'mobile','serviceName','staffName','startTime','serviceDuration','servicePrice','status','source','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  animal: string;
  customerName: string;  
  customerMobile: string;
  customerEmail: string;
  serviceTitle: string;
  bookingStatus: string;
  bookingStatusBg: string;
  startTime:string;
  eventId:string;
  endTime:string;
  staffName: string;
  source: string;
  bookedTime:string;
  resourceName: string;
  showModal: boolean;  
  @ViewChild(FullCalendarComponent, {static: true}) calendarComponent: FullCalendarComponent;  
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, resourceTimeGridPlugin];
  calendarWeekends = true;
  todayDate = new Date();
  resources: any[] = [
    {id:'1',title:'Devi'},
    {id:'2',title:'Ramya'},
    {id:'3',title:'Nithya'},
    {id:'4',title:'Ashika'},
    {id:'5',title:'Ravi'},
    {id:'6',title:'Devi'},
    {id:'7',title:'Ramya'},
    {id:'8',title:'Nithya'},
    {id:'9',title:'Ashika'},
    {id:'10',title:'Ravi'}
  ];  
  status: Status[] = [
    {value: 'New', viewValue: 'New'},
    {value: 'Arrived', viewValue: 'Customer Arrived'},
    {value: 'Started', viewValue: 'In Process'},
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'Cancelled', viewValue: 'Cancelled'}
  ];
  businessHours: [ // specify an array instead
    {
      daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
      startTime: '08:00', // 8am
      endTime: '18:00' // 6pm
    },
    {
      daysOfWeek: [ 4, 5 ], // Thursday, Friday
      startTime: '10:00', // 10am
      endTime: '16:00' // 4pm
    }
  ]
  // events: any = [
  //   { title: 'Hair Cut', customerName:'Nisha', customerMobile:'9632574512', customerEmail:'nisha23@gmail.com', resourceId:'1', startTime: new Date(), staffName:'Devi', source:'Walk-in', bookedTime:'10:00AM', backgroundColor:'#f00'},
  //   { title: 'Bleech',  customerName:'Zenath', customerMobile:'9632574512', customerEmail:'nisha23@gmail.com', resourceId:'2',startTime: new Date(), staffName:'Ramya',  source:'Facebooj', bookedTime:'09:30AM', backgroundColor:'#9fb3d4' },
  //   { title: 'Facial',  customerName:'Meera', customerMobile:'9632574512', customerEmail:'nisha23@gmail.com', resourceId:'1', startTime: new Date('2019-10-17'), staffName:'Devi',  source:'Phone', bookedTime:'10:10AM', backgroundColor:'#407d5d' },
  //   { title: 'Hair Coloring',  customerName:'Nisha', customerMobile:'9632574512', customerEmail:'nisha23@gmail.com', resourceId:'3', startTime: new Date('2019-10-16'), staffName:'Nithya',  source:'Walk-in', bookedTime:'04:20PM', backgroundColor:'#34cf7d' }
  // ]; 
  events: any = [
    {id:'1', title: 'Hair Cut', resourceId:'1', start: new Date(),  backgroundColor:'#3498db'},
    {id:'2',  title: 'Bleech',  resourceId:'2',start: new Date(), backgroundColor:'#9fb3d4' },
    {id:'3',  title: 'Facial',  resourceId:'1', start: new Date('2019-10-17'),backgroundColor:'#407d5d' },
    {id:'4',  title: 'Hair Coloring', resourceId:'3', start: new Date('2019-10-16'),  backgroundColor:'#34cf7d' },
    {id:'5',  title: 'Tan Mask', resourceId:'3', start: new Date(),  backgroundColor:'#f00' }
  ]; 
  eventClick(model:any) {
    this.serviceTitle = model.event.title;
    this.startTime = model.event.start;   
    this.eventId = model.event.id;
    this.bookingStatusBg = model.event.backgroundColor;
    if(this.bookingStatusBg == '#3498db') {
      this.bookingStatus = 'New';
    } else if(this.bookingStatusBg == '#9fb3d4') {
      this.bookingStatus = 'Arrived';
    }
    else if(this.bookingStatusBg == '#407d5d') {
      this.bookingStatus = 'In Process';
    }
    else if(this.bookingStatusBg == '#34cf7d') {
      this.bookingStatus = 'Completed';
    } else {
      this.bookingStatus = 'Cancelled';
    }
    // this.endTime = model.event.end;
    // this.resourceName = model.event.resourceId.title;
    // this.customerName = model.event.customerName;
    // this.customerEmail = model.event.customerEmail;
    // this.customerMobile = model.event.customerMobile;
    // this.staffName = model.event.staffName;
    // this.source = model.event.source;
    // this.bookedTime = model.event.bookedTime;
     this.showModal = true;    
  }
  hide()
  {
    this.showModal = false;
  }
      
  clickEvent(val) {
    console.log(val);
  }
 
  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }


  handleDateClick(arg) {
    if(arg.date >= this.todayDate) {    
      this.router.navigate(['/beautelabs/cbot-admin/bookingCreate', { Seldate: arg.dateStr }]);
    } else {
      Swal.fire('Select valid date');
    }

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
   constructor(private modalService: BsModalService, public dialog: MatDialog, public router: Router) { }
  
   cancelBooking(val) {
     this.bookingStatus = 'Cancelled';  
   }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.initFunction();
    this.calicon="list";
    this.calString = "Calendar";
    this.selIcon = "event";    
}
caltoggle() { 
  if(this.calicon == "event_note") { 
    this.calicon = "list";
    this.calString = "List";
    this.selIcon = 'event';
  } else if(this.calicon == "list")  {
    this.selIcon = "list";
    this.calString = "Calendar";
    this.calicon = "event_note";
  }
}
}
