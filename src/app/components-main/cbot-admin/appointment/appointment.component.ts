import { Component, OnInit, ViewChild, TemplateRef, HostBinding, ElementRef, ChangeDetectionStrategy, Input, Output, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import Swal from 'sweetalert2';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Router } from '@angular/router';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import { MonthViewDay } from 'calendar-utils';

import Tooltip from 'tooltip.js'; 

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isTuesday,
  getHours,
  getMinutes,
  getTime,
  setHours,
  setMinutes,
  isSameMinute
} from 'date-fns';
import { Subject, Subscription, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { BookingComponent } from 'src/app/shared/dialog/booking/booking.component';
import Popper from 'popper.js';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3'
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF'
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA'
//   }
// };

const colors: any = {
  yellow: {
    primary: '#ffd619',
    secondary: '#fde98a'
  },
  orange: {
    primary: '#ffa217',
    secondary: '#fbeab9'
  },
  blue: {
    primary: '#64c9ff',
    secondary: '#c6e5f5'
  },
  green : {
    primary: '#43bc1b',
    secondary: '#c1fbae'
  }
};

interface MyCalendarEventTimesChangedEvent extends CalendarEventTimesChangedEvent {
  droppedOutsideCalendar?: boolean;
}
export interface bookingstartTime {
  value: string;
}
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
  {sno: 1, name: 'Meera',mobile: '9632587412',serviceName:'Glow Mask Facial',staffName:'Aadhi',startTime:'09:00',serviceDuration:'01:00',servicePrice:'1,500.00',status:'Arrived',source:'Phone'},
  {sno: 2, name: 'Nila', mobile: '7946132541',serviceName:'Tan Mask',staffName:'Devi',startTime:'09:45',serviceDuration:'00:45',servicePrice:'800.00',status:'Arrived',source:'Direct'},
  {sno: 3, name: 'Naveen', mobile: '8293714612',serviceName:'Hair Cut',staffName:'Hari',startTime:'09:10',serviceDuration:'00:30',servicePrice:'120.00',status:'Arrived',source:'Phone'},
  {sno: 4, name: 'Hema', mobile: '7391827391',serviceName:'Bleech and Facial',staffName:'Latha',startTime:'10:00',serviceDuration:'01:30',servicePrice:'2,000.00',status:'Arrived',source:'Direct'},
  {sno: 5, name: 'Jai', mobile: '9685741245',serviceName:'Hair Cut',staffName:'Karthi',startTime:'10:30',serviceDuration:'00:20',servicePrice:'200.00',status:'booked',source:'Phone'},
  {sno: 6, name: 'SasiKumar', mobile: '7193827391',serviceName:'Threading',staffName:'Nisha',startTime:'09:50',serviceDuration:'00:15',servicePrice:'50.00',status:'Arrived',source:'Phone'},
  {sno: 7, name: 'Nisha', mobile: '9176947845',serviceName:'Hair Cut',staffName:'Aadhi',startTime:'10:30',serviceDuration:'00:30',servicePrice:'200.00',status:'booked',source:'Direct'},
  {sno: 8, name: 'Latha', mobile: '8974654123',serviceName:'Threading',staffName:'Devi',startTime:'11:00',serviceDuration:'00:15',servicePrice:'50.00',status:'booked',source:'Phone'},
  {sno: 9, name: 'Ravi', mobile: '7986957454',serviceName:'Facial',staffName:'Karthi',startTime:'12:10',serviceDuration:'00:40',servicePrice:'1,300.00',status:'booked',source:'Facebook'},
  {sno: 10, name: 'Abhinaya', mobile: '9876543214',serviceName:'Party Makeup',staffName:'Nisha',startTime:'11:15',serviceDuration:'02:00',servicePrice:'4,500.00',status:'booked',source:'Website'},
  {sno: 11, name: 'Zenath', mobile: '8795462134',serviceName:'Threading',staffName:'Devi',startTime:'12:30',serviceDuration:'00:15',servicePrice:'50.00',status:'booked',source:'Phone'},
  {sno: 12, name: 'Nithya', mobile: '9678125432',serviceName:'Threading',staffName:'Nisha',startTime:'12:45',serviceDuration:'00:15',servicePrice:'50.00',status:'booked',source:'Phone'},
  {sno: 13, name: 'Anbu', mobile: '7684957545',serviceName:'Hair Cut',staffName:'Sasi',startTime:'09:50',serviceDuration:'00:20',servicePrice:'120.00',status:'Arrived',source:'Phone'},
  {sno: 14, name: 'Sasi', mobile: '9283714565',serviceName:'Facial',staffName:'Prakash',startTime:'09:20',serviceDuration:'01:00',servicePrice:'700.00',status:'Arrived',source:'Phone'},
];

const SERVICE_DATA: Service[] = [
  {name: 'HaiCut'},
  {name: 'Bleech'}
];
export interface Status {
  value: string;
  viewValue: string;
}
export interface Service {
  name: string;
}
export interface Customer {
  name: string;
  mobile:string;
}
export interface Users{
  name: string
}


const users = [
  {
    id: 0,
    name: 'Abhi'
  },
  {
    id: 1,
    name: 'Deepthi'
  },
  {
    id: 2,
    name: 'Devi'
  },
  {
    id: 3,
    name: 'Nisha'
  },
  {
    id: 4,
    name: 'Nithya'
  },
  {
    id: 5,
    name: 'Raja'
  },
  {
    id: 6,
    name: 'Ravi'
  }
];
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent implements OnInit {
  public calicon:any;
  public selIcon:string;
  public calString: string;
  public data: Object[];
  @HostBinding('@.disabled') disabled = true;
  public eventMarkers: any;
  taskfield:any;
  bookingForm: FormGroup;
  displayedColumns: string[] = ['sno', 'name', 'mobile','serviceName','staffName','startTime','serviceDuration','servicePrice','status','source','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // modalRef: BsModalRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  animal: string;
  customerName: string;  
  customerMobile: string;
  customerEmail: string;  
  serviceTitle: string;
  bookingStatus: string;
  bookingStatusBg: string;
  showMarker = true;
  userName: any = '';
  bookingstartTime: bookingstartTime[] = [
    {value: '12:00'},
    {value: '12:05'},
    {value: '12:10'},
    {value: '12:15'},
    {value: '12:20'},
    {value: '12:25'},
    {value: '12:30'},
    {value: '12:35'},
    {value: '12:40'},
    {value: '12:45'},
  ]; 

  startTime:string;
  eventId:string;
  listView: boolean = false;
  dayView: boolean = true;
  defaultView: boolean = false;
  endTime:string;
  filterEvents:any;
  staffName: string;
  source: string;
  bookedTime:string;
  resourceName: string;
  options: any;
  selectedService:any;
  selectedServiceName: string;
  eventsModel: any;
  bookingServiceStaff: any;
  showModal: boolean;    
  @ViewChild('fullCalendar', { static: true }) fullCalendar: FullCalendarComponent;
  @ViewChild('newEvents', { static:false }) public external: ElementRef;
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  //view: CalendarView;
  CalendarView = CalendarView;
  viewDate: Date = new Date();  
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, resourceTimeGridPlugin];
  calendarWeekends = true;
  todayDate = new Date();

  userList: Users[] = [
    {name: 'Nisha'},
    {name: 'Deepthi'},
    {name: 'Ravi'}
  ];
  resources: any[] = [
    {id:'1',title:'Abhi'},
    {id:'2',title:'Deepthi'},
    {id:'3',title:'Devi'},
    {id:'4',title:'Nisha'},
    {id:'5',title:'Nithya'},
    {id:'6',title:'Raja'},
    {id:'7',title:'Ravi'},
    // {id:'8',title:'Ravi'},
    // {id:'9',title:'Usha'},
    // {id:'10',title:'Zeenath'}
  ];  
  displayedServiceColumns: string[] = ['name'];
  dataServiceSource = new MatTableDataSource(SERVICE_DATA);
  status: Status[] = [
    {value: 'New', viewValue: 'New'},
    {value: 'Arrived', viewValue: 'Customer Arrived'},
    {value: 'Started', viewValue: 'In Process'},
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'Cancelled', viewValue: 'Cancelled'}
  ];
  businessHours: [ // specify an array instead
    {
      daysOfWeek: [ 0, 1, 2, 3, 4, 5, 6 ],
      startTime: '07:00', // 8am
      endTime: '22:00' // 6pm
    },
   
  ]
  service: any;
  customerHistory : boolean = false;
  serviceTime:any;  
  services: Service[] = [
    {name: 'Hair Cut'},
    {name: 'Bleech'},
    {name: 'Facial'}
  ];
  customerDet = new FormControl();
  filteredCustomer: Observable<Customer[]>; 
  customer: Customer[] = [
    {name: 'Abhi', mobile:'9632587412'},
    {name: 'Ramesh Bommiah - 7894561232',mobile:'7894561232'},
    {name: 'Sruthi',mobile:'9764317946'},
    {name:'Ravi',mobile:'8293714697'}
  ];

  eventsOld: any = [
    {id:'1', title: 'Haircut', resourceId:'1', start: new Date('2019-12-15 14:30:00'), end: new Date('2019-11-29 16:30:00'),  backgroundColor:'#ffd619'},
    {id:'2', title: 'Waxing',  resourceId:'2',start: new Date('2019-12-16 17:30:00'), end: new Date('2019-11-29 18:00:00'), backgroundColor:'#ffa217' },
    {id:'3', title: 'Facial',  resourceId:'1', start: new Date('2019-12-16 10:30:00'), end: new Date('2019-11-28 11:30:00'), backgroundColor:'#ffd619' },
    {id:'4', title: 'Hair Coloring', resourceId:'3', start: new Date('2019-12-16 15:00:00'), end: new Date('2019-11-29 16:30:00'), backgroundColor:'#64c9ff' },
    {id:'5', title: 'Waxing', resourceId:'3', start: new Date('2019-12-15 15:00:00'), end: new Date('2019-11-25 16:30:00'), backgroundColor:'#43bc1b' },
    {id:'5', title: 'Hair Colouring', resourceId:'3', start: new Date('2019-12-17 14:00:00'), end: new Date('2019-11-28 16:30:00'), backgroundColor:'#4d31e6' },
    {id:'6', title: 'Body Polishing', resourceId:'4', start: new Date('2019-12-16 11:00:00'), end: new Date('2019-11-25 13:00:00'), backgroundColor:'#43bc1b' },
    {id:'7', title: 'Facial',  resourceId:'1', start: new Date('2019-12-17 09:00:00'), end: new Date('2019-11-29 10:30:00'), backgroundColor:'#43bc1b' },
    {id:'6', title: 'Body Polishing', resourceId:'1', start: new Date('2019-12-16 15:00:00'), end: new Date('2019-11-28 16:30:00'), backgroundColor:'#64c9ff' },
    {id:'8', title: 'Threading', resourceId:'5', start: new Date('2019-12-15 12:00:00'), end: new Date('2019-11-29 12:30:00'), backgroundColor:'#ffa217' },
    {id:'9', title: 'Threading', resourceId:'1', start: new Date('2019-12-17 18:00:00'), end: new Date('2019-11-28 19:00:00'), backgroundColor:'#ffd619' },
    {id:'10', title: 'Facial', resourceId:'2', start: new Date('2019-12-18 09:00:00'), end: new Date('2019-11-29 10:00:00'), backgroundColor:'#ffa217' },
    {id:'11', title: 'Body Polishing', resourceId:'1', start: new Date('2019-12-24 16:00:00'), end: new Date('2019-11-24 16:30:00'), backgroundColor:'#ffd619' },
    {id:'12', title: 'Threading', resourceId:'7', start: new Date('2019-12-28 10:30:00'), end: new Date('2019-11-28 11:30:00'), backgroundColor:'#43bc1b' },
    {id:'13', title: 'Hair Coloring', resourceId:'6', start: new Date('2019-12-18 10:00:00'), end: new Date('2019-12-01 11:30:00'), backgroundColor:'#64c9ff' },
    {id:'14', title: 'Threading', resourceId:'5', start: new Date('2019-12-18 12:00:00'), end: new Date('2019-11-30 12:30:00'), backgroundColor:'#ffa217' },
    {id:'15', title: 'Threading', resourceId:'1', start: new Date('2019-12-16 18:00:00'), end: new Date('2019-11-30 19:00:00'), backgroundColor:'#ffd619' },
    {id:'16', title: 'Facial', resourceId:'2', start: new Date('2019-11-30 09:00:00'), end: new Date('2019-11-30 10:00:00'), backgroundColor:'#ffa217' },
    {id:'17', title: 'Body Polishing', resourceId:'1', start: new Date('2019-12-01 16:00:00'), end: new Date('2019-12-01 17:30:00'), backgroundColor:'#ffd619' },
    {id:'18', title: 'Body Polishing', resourceId:'4', start: new Date('2019-11-30 10:00:00'), end: new Date('2019-11-30 11:30:00'), backgroundColor:'#43bc1b' },
    {id:'19', title: 'Hair Coloring', resourceId:'6', start: new Date('2019-11-30 10:00:00'), end: new Date('2019-11-30 11:30:00'), backgroundColor:'#64c9ff' },
    {id:'20', title: 'Waxing', resourceId:'3',start: new Date('2019-11-30 17:30:00'), end: new Date('2019-11-30 18:30:00'), backgroundColor:'#ffa217' },
    {id:'21', title: 'Facial', resourceId:'4',start: new Date('2019-11-30 17:30:00'), end: new Date('2019-11-30 19:00:00'), backgroundColor:'#43bc1b' },
  ]; 

//Events w/o bg color
  // eventsOld: any = [
  //   {id:'1', title: 'Haircut', resourceId:'1', start: new Date('2019-11-29 14:30:00'), end: new Date('2019-11-29 16:30:00')},
  //   {id:'2',  title: 'Waxing',  resourceId:'2',start: new Date('2019-11-29 17:30:00'), end: new Date('2019-11-29 18:00:00')},
  //   {id:'3',  title: 'Facial',  resourceId:'1', start: new Date('2019-11-28 10:30:00'), end: new Date('2019-11-28 11:30:00') },
  //   {id:'4',  title: 'Hair Coloring', resourceId:'3', start: new Date('2019-11-29 15:00:00'), end: new Date('2019-11-29 16:30:00') },
  //   {id:'5',  title: 'Waxing', resourceId:'3', start: new Date('2019-11-25 15:00:00'), end: new Date('2019-11-25 16:30:00') },
  //   {id:'5',  title: 'Hair Colouring', resourceId:'3', start: new Date('2019-11-28 14:00:00'), end: new Date('2019-11-28 16:30:00') },
  //   {id:'6',  title: 'Body Polishing',  resourceId:'4', start: new Date('2019-11-25 11:00:00'), end: new Date('2019-11-25 13:00:00') },
  //   {id:'7',  title: 'Facial',  resourceId:'1', start: new Date('2019-11-29 09:00:00'), end: new Date('2019-11-29 10:30:00') },
  //   {id:'6',  title: 'Body Polishing',  resourceId:'1', start: new Date('2019-11-28 15:00:00'), end: new Date('2019-11-28 16:30:00') },
  //   {id:'8',  title: 'Threading',  resourceId:'5', start: new Date('2019-11-29 12:00:00'), end: new Date('2019-11-29 12:30:00') },
  //   {id:'9',  title: 'Threading',  resourceId:'1', start: new Date('2019-11-28 18:00:00'), end: new Date('2019-11-28 19:00:00') },
  //   {id:'10', title: 'Facial',  resourceId:'2', start: new Date('2019-11-29 09:00:00'), end: new Date('2019-11-29 10:00:00') },
  //   {id:'11', title: 'Body Polishing',  resourceId:'1', start: new Date('2019-11-24 16:00:00'), end: new Date('2019-11-24 16:30:00') },
  //   {id:'12', title: 'Threading',  resourceId:'7', start: new Date('2019-11-28 10:30:00'), end: new Date('2019-11-28 13:30:00') },
  //   {id:'13', title: 'Hair Coloring',  resourceId:'6', start: new Date('2019-11-30 10:00:00'), end: new Date('2019-11-30 10:30:00') },
  // ]; 


  eventClick(model:any) {
    this.serviceTitle = model.event.title;
    this.startTime = model.event.start;   
    this.eventId = model.event.id;
    this.bookingStatusBg = model.event.backgroundColor;    
    if(this.bookingStatusBg == '#F3565D') {
      this.bookingStatus = 'New';
    } else if(this.bookingStatusBg == '#fb6a3d') {
      this.bookingStatus = 'Arrived';
    }
    else if(this.bookingStatusBg == '#1BBC9B') {
      this.bookingStatus = 'Started';
    }
    else if(this.bookingStatusBg == '#9B59B6') {
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
  eventDragStop(model) {
    console.log('drag stop');
    
  }
  onEventRender(info: any) {                    
    const tooltip = new Tooltip(info.el, { 
      title: info.event.title, 
      placement: 'top', 
      trigger: 'hover', 
      container: 'body'
    });               
  } 
  // onEventAfterRender(eventObj, $el) {
  //   console.log($el);
    
  //   $el.popover({
  //     title: eventObj.title,
  //     content: eventObj.description,
  //     trigger: 'hover',
  //     placement: 'top',
  //     container: 'body'
  //   });
  // }
  eventReceive(val) {                
    const check = new Date(val.event.start).toLocaleTimeString().replace(/:\d+ /, ' ');
    const title = val.event.title;
    const bgColor = '#ffd619';
    const dialogRef = this.dialog.open(BookingComponent, {
      data:{ check, title, bgColor  },       
      width: '70%',
      height:'70%'       
    });  
    dialogRef.afterClosed().subscribe(result => {      
        if(result) {          
          this.bookingServiceStaff = result.service[0].bookingStaff;
        }
    });    
    this.events.push({
      start: val.event.start,
      end: val.event.end,      
      title: val.event.title,
      color: colors.red,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: this.bookingServiceStaff
      },
    });
    this.eventsOld.push({
      id:'1', title: val.event.title, resourceId:this.bookingServiceStaff, start: val.event.start, end: val.event.end,  backgroundColor:'#ffd619'
    });
  }


  eventClicked(val) {                
    var dt = val.event.start;
    var userName = val.event._calendar.state.resourceStore[val.event._def.resourceIds[0]].title;    
    var bgColor = val.event.backgroundColor;
    if(bgColor == "") {
       bgColor = '#ffd619';
    }
    const check = new Date(val.event.start).toLocaleTimeString().replace(/:\d+ /, ' ');
    const title = val.event.title
    const dialogRef = this.dialog.open(BookingComponent, {
      data:{ check, title, userName, dt, bgColor },       
      width: '70%',
      height:'70%'       
    });  
    dialogRef.afterClosed().subscribe(result => {      
        if(result) {
          this.bookingServiceStaff = result.service[0].bookingStaff;
        }
    });
  }

  eventListClicked(val) {            
    var dt = val.event.start;
    var userName = val.event._calendar.state.resourceStore[val.event._def.sourceId].title;    
    var bgColor = val.event.backgroundColor;
    const check = new Date(val.event.start).toLocaleTimeString().replace(/:\d+ /, ' ');
    const title = val.event.title
    const dialogRef = this.dialog.open(BookingComponent, {
      data:{ check, title, userName, dt, bgColor },       
      width: '70%',
      height:'70%'       
    });  
    dialogRef.afterClosed().subscribe(result => {      
        if(result) {
          this.bookingServiceStaff = result.service[0].bookingStaff;
        }
    });
  }


  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }
  startBill(billId) {
    this.router.navigate(['/beautelabs/cbot-admin/saleCreate', billId])
  }
  
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
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
  

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil dark-font"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-trash dark-font"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {                
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  groupedSimilarEvents: CalendarEvent[] = [];
  events: CalendarEvent[] = [
    {
      start: addDays(setHours(setMinutes(new Date(), 30), 11), 1),
      end: addDays(setHours(setMinutes(new Date(), 0), 12),1),
      title: 'Threading',
      color: colors.blue,
      actions: this.actions,      
      draggable: true,
      meta: {
        user: users[1]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    },
    {
      
      start: setHours(setMinutes(new Date(), 0), 9),
      end: setHours(setMinutes(new Date(), 30), 9),      
      title: 'Haircut',
      color: colors.orange,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: users[0]
      },
    },
    {
      start: setHours(setMinutes(new Date(), 0), 7),
      end: setHours(setMinutes(new Date(), 30), 7),   
      title: 'Threading',
      color: colors.blue,
      actions: this.actions,      
      draggable: true,
      meta: {
        user: users[1]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    },
    {
      start: setHours(setMinutes(new Date(), 0), 7),
      end: setHours(setMinutes(new Date(), 30), 7),   
      title: 'Threading',
      color: colors.blue,
      actions: this.actions,      
      draggable: true,
      meta: {
        user: users[2]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    },
    {
      title: 'Waxing',
      start: setHours(setMinutes(new Date(), 0), 13),
      end: setHours(setMinutes(new Date(), 0), 14),   
      color: colors.yellow,
      actions: this.actions,
      meta: {
        user: users[2]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },

    {
      start: subDays(setHours(setMinutes(new Date(), 0), 13), 1),
      end: subDays(setHours(setMinutes(new Date(), 30), 14),1),
      title: 'Waxing',
      color: colors.blue,
      actions: this.actions,      
      draggable: true,
      meta: {
        user: users[1]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    },
    {
      start: subDays(setHours(setMinutes(new Date(), 0), 10), 2),
      end: subDays(setHours(setMinutes(new Date(), 0), 11),2),
      title: 'Facial',
      color: colors.blue,
      actions: this.actions,      
      draggable: true,
      meta: {
        user: users[1]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    },
    {
      start: setHours(setMinutes(new Date(), 0), 15),
      end: setHours(setMinutes(new Date(), 0), 16),   
      title: 'Facial',
      color: colors.blue,
      meta: {
        user: users[4]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: setHours(setMinutes(new Date(), 0), 18),
      end: setHours(setMinutes(new Date(), 0), 19),   
      title: 'Waxing',
      color: colors.green,
      meta: {
        user: users[4]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: setHours(setMinutes(new Date(), 0), 16),
      end: setHours(setMinutes(new Date(), 30), 17),   
      title: 'Body Polishing',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: users[3]
      },
    },
    {
      start: setHours(setMinutes(new Date(), 0), 18),
      end: setHours(setMinutes(new Date(), 0), 19),   
      title: 'Facial',
      color: colors.green,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: users[5]
      },
    },
    {
      start: setHours(setMinutes(new Date(), 0), 7),
      end: setHours(setMinutes(new Date(), 30), 7),   
      title: 'Hair Coloring',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: users[6]
      },
    },
    {
      start: setHours(setMinutes(new Date(), 0), 9),
      end: setHours(setMinutes(new Date(), 30), 10),   
      title: 'Body Polishing',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: users[6]
      },
    },
    {
      start: setHours(setMinutes(new Date(), 0), 11),
      end: setHours(setMinutes(new Date(), 30), 12),   
      title: 'Body Polishing',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: users[3]
      },
    },
    {
      start: setHours(setMinutes(new Date('November 30, 2019'), 0), 10),
      end: setHours(setMinutes(new Date('November 30, 2019'), 30), 10),     
      title: 'Hair Coloring',
      color: colors.orange,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        user: users[3]
      },
    }
  ];

  activeDayIsOpen: boolean = false; 
  externalEvents: CalendarEvent[] = [
    {
      title: 'New Appointment',
      color: colors.yellow,
      start: new Date(),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
    },    
    {
    title: 'Haircut',
    color: colors.yellow,
    start: new Date(),
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
  }, {
    title: 'Facial',
    color: colors.blue,
    start: new Date(),
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
  }, {
    title: 'Waxing',
    color: colors.blue,
    start: new Date(),
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
  }, 
  {
    title: 'Body Polishing',
    color: colors.blue,
    start: new Date(),
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
  }, {
    title: 'Threading',
    color: colors.blue,
    start: new Date(),
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
  }, 
];


eventDropped({event, newStart, newEnd, droppedOutsideCalendar}: MyCalendarEventTimesChangedEvent): void {  
  if (!droppedOutsideCalendar) {
    const externalIndex: number = this.externalEvents.indexOf(event);
    
    if (externalIndex > -1) {
      // this.externalEvents.splice(externalIndex, 1);
      this.events.push(
        {
          start: newStart,
          end: newEnd,
          title: event.title,
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          meta: {
            user: users[0],            
          },
        }
      );
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = false;
  }
  //this.newEvent('New Event', event);
  this.newExternalEvent('New Event', event);
  this.eventsOld.push(
    {
      id:'12',
      start: newStart,
      resourceId:'3',
      title: event.title,
      backgroundColor: colors.yellow,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
    }
  )
  // this.openNewBooking();
  // this.handleEvent('Dropped or resized', event);
}


// eventDropped({
//   event,
//   newStart,
//   newEnd,
//   allDay
// }: CalendarEventTimesChangedEvent): void {
//   const externalIndex = this.externalEvents.indexOf(event);
//   if (typeof allDay !== 'undefined') {
//     event.allDay = allDay;
//   }
//   if (externalIndex > -1) {
//     this.externalEvents.splice(externalIndex, 1);
//     this.events.push(event);
//   }
//   event.start = newStart;
//   if (newEnd) {
//     event.end = newEnd;
//   }
//   if (this.view === 'month') {
//     this.viewDate = newStart;
//     this.activeDayIsOpen = true;
//   }
//   this.events = [...this.events];
// }

// externalDrop(event: CalendarEvent) {
//   if (this.externalEvents.indexOf(event) === -1) {
//     this.events = this.events.filter(iEvent => iEvent !== event);
//     this.externalEvents.push(event);
//   }
// }

droppedBack(event: CalendarEvent): void {    
  const internalIndex: number = this.events.indexOf(event);
  if (internalIndex > -1) {
    this.events.splice(internalIndex, 1);
    this.externalEvents.push(event);
    this.refresh.next();
  }
}
monthEvents: CalendarEvent[] = [];
  //  constructor(private modalService: BsModalService, public dialog: MatDialog, public router: Router, private modal: NgbModal) { }
  constructor( public router: Router, private modal: NgbModal, private formBuilder: FormBuilder, private dialog: MatDialog ) {
    this.monthEvents = this.events; 
    this.filteredCustomer = this.customerDet.valueChanges
    .pipe(
      startWith(''),
      map(customer => customer ? this._filterCustomer(customer) : this.customer.slice())
    );    
  }
  
   cancelBooking(val) {
     this.bookingStatus = 'Cancelled';  
   }

   delService(serName) {
    const externalIndex: number = this.services.indexOf(serName);
    if (externalIndex !== -1) {
        this.services.splice(externalIndex, 1);
    }             
   }
   addNew(ser) {
     this.services.push({name:ser});     
     SERVICE_DATA.push({name: ser})
     this.dataServiceSource = new MatTableDataSource(SERVICE_DATA);       
     
      // this.externalEvents.push( { title: this.selectedServiceName,
      // color: colors.blue,
      // start: new Date(),
      // draggable: true,
      // resizable: {
      //   beforeStart: true,
      //   afterEnd: true
      // } });
      
   }
   selService(val) {     
     const externalIndex: number = this.externalEvents.indexOf(val);
     this.externalEvents.splice(externalIndex, 1);
     
   }

  ngOnInit() {   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.calicon="list";
    this.calString = "Calendar";
    this.selIcon = "event";    
    this.options = {
      editable: true,
      eventLimit: true, // for all non-TimeGrid views
      header: {
         left: 'prev today next',
         center: 'title',
         //right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek'
         right: ''
      },    
      buttonText: {
        today: 'Today'
      },
      // add other plugins
      // plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin, listPlugin],    
      // plugins: [resourceTimelinePlugin, listPlugin, timeGridPlugin, interactionPlugin],       
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, resourceTimelinePlugin],   
      views: {
        timeGrid: {
          eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
        },
        dayGrid: {
          eventLimit: 4
        }
      },     
    //   eventAfterRender: function(event, element) {
    //      $(element).tooltip({          
    //         title: event.title,
    //         container: "body"
    //     });
    // },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 0, 1, 2, 3, 4, 5, 6], // Sunday - Monday
      
        startTime: '07:00', // a start time (07:00am)
        endTime: '22:00', // an end time (09:30pm)
      },
      hiddenDays: [],       
    //   eventRender: function (eventObj, $el) {
    //     $el.popover({
    //         title: eventObj.title,
    //         content: eventObj.description,
    //         trigger: 'hover',
    //         placement: 'top',
    //         container: 'body'
    //     });
    // },
    
    
      // eventDrop: function(info) {               
      //   alert(info.event.title + " was dropped on " + info.event.start.toISOString());    
      //   if (!confirm("Are you sure about this change?")) {
      //     info.revert();
      //   }
      // } 
     };             
     this.bookingForm = new FormGroup({
      customerName: new FormControl(null),
      bookingDate: new FormControl(null),    
      bookingStatus: new FormControl(null),
      bookingSource: new FormControl(null),
      service: this.formBuilder.array([this.createService()]),      
      bookingNote: new FormControl(null),
    });
    this.groupedSimilarEvents = [];
    const processedEvents = new Set();
    this.events.forEach(event => {
      if (processedEvents.has(event)) {
        return;
      }
      const similarEvents = this.events.filter(otherEvent => {
        return (
          otherEvent !== event &&
          !processedEvents.has(otherEvent) &&
          isSameMinute(otherEvent.start, event.start) &&
          (isSameMinute(otherEvent.end, event.end) ||
            (!otherEvent.end && !event.end)) &&
          otherEvent.color.primary === event.color.primary &&
          otherEvent.color.secondary === event.color.secondary
        );
      });
      processedEvents.add(event);
      similarEvents.forEach(otherEvent => {
        processedEvents.add(otherEvent);
      });
      if (similarEvents.length > 0) {
        this.groupedSimilarEvents.push({
          // title: `${similarEvents.length + 1} events`,
          title: `${similarEvents.length + 1} - ` + event.title,
          color: event.color,
          start: event.start,
          end: event.end,
          meta: {
            groupedEvents: [event, ...similarEvents]
          }
        });
      } else {
        this.groupedSimilarEvents.push(event);
      }
    });
  }

  private _filterCustomer(value: string): Customer[] {
    const filterValue = value;       
    this.customerHistory = true;
    return this.customer.filter(customername => customername.name.toLowerCase().indexOf(filterValue) === 0 || customername.mobile.indexOf(filterValue) === 0);
  }
  createService(): FormGroup {
    return this.formBuilder.group({
      bookingService: new FormControl(),
      bookingStaff: new FormControl(),
      bookingStartTime: new FormControl(),
    });    
 }

addService(): void {
  this.service = this.bookingForm.get('service') as FormArray;
  this.service.push(this.createService());
}
Delete(_index) {
  this.service.removeAt(_index);
}

ngAfterViewInit() {  
  this.dayView = true;
   new Draggable(this.external.nativeElement, {        
        itemSelector: '.fc-event',        
        eventData: function(eventEl) {     
          return {            
            title: eventEl.innerText
          };

        }
        

     });  
     
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

// addNew(ser){
  // SERVICE_DATA.push(this.services);  
  // this.dataServiceSource = new MatTableDataSource(SERVICE_DATA);
  // this.services = {
  //   name :""
  // };
  // }
  selectChangeHandler (event: any) {    
    this.selectedService = event.target.value;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    if(isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        // this.activeDayIsOpen = true;
        this.activeDayIsOpen = false;
      }
      this.viewDate = date;
      this.monthEvents = events;           
    }    
  }
 
 
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {    
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  newEvent(action: string, event: CalendarEvent): void {        
    this.modalData = { event, action };
    const title = event.title;         
    const userName = event.meta.user.name;
    
    const check = new Date(event.start).toLocaleTimeString().replace(/:\d+ /, ' ');    
    // console.log('Start',this.bookingForm.controls.service[0].bookingStartTime);
    // openNewBooking() {         
    const dialogRef = this.dialog.open(BookingComponent, {
        data:{ check, title, userName },       
        width: '70%',
        height:'70%'       
      });  
      dialogRef.afterClosed().subscribe(result => {      
          if(result) {            
            this.bookingServiceStaff = result.service[0].bookingStaff;
          }
      });
    // }
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  weekEventClicked(action: string, event: CalendarEvent): void {         
    this.modalData = { event, action };
    const title = event.title;         
    const userName = event.meta.user.name;
    const dt = event.start;
    const bgColor = event.color['primary'];
    const check = new Date(event.start).toLocaleTimeString().replace(/:\d+ /, ' ');    
    const dialogRef = this.dialog.open(BookingComponent, {
        data:{ check, title, userName, dt, bgColor },       
        width: '70%',
        height:'70%'       
      });  
      dialogRef.afterClosed().subscribe(result => {      
          if(result) {            
            this.bookingServiceStaff = result.service[0].bookingStaff;
          }
      });
  }

  newExternalEvent(action: string, event: CalendarEvent): void {        
    this.modalData = { event, action };
    const title = event.title;         
    
    const check = new Date(event.start).toLocaleTimeString().replace(/:\d+ /, ' ');
    const dialogRef = this.dialog.open(BookingComponent, {
        data:{ check, title },       
        width: '70%',
        height:'70%'       
      });  
      dialogRef.afterClosed().subscribe(result => {      
          if(result) {            
            this.bookingServiceStaff = result.service[0].bookingStaff;
          }
      });
  }

  newDayEvent(action:string, eventTime) : void {
    
    const check = new Date(eventTime).toLocaleTimeString().replace(/:\d+ /, ' ');
    const title = '';
    const dialogRef = this.dialog.open(BookingComponent, {
      data:{ check, title },
      width: '70%',
      height:'70%'       
    });  
    dialogRef.afterClosed().subscribe(result => {       

    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];   
    this.eventsOld.push(
      {
        id:'12',
        start:  startOfDay(new Date()),
        resourceId:'3',
        title: 'New Event',
        backgroundColor: colors.yellow,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
      }
    )
  }
  deleteEvent(eventToDelete: CalendarEvent) {   
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {                
    this.defaultView = true;
    this.view = view;
    this.listView = false;
    this.dayView = true;
    this.ngAfterViewInit();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  showListView() {        
    this.listView = true;
    this.defaultView = false;
    this.dayView = true;
    this.ngAfterViewInit();
  }
  showDayView() {
    this.dayView = true;
    this.listView = false;    
    this.defaultView = false;   
    this.ngAfterViewInit();
  }
  doubleClick (day: MonthViewDay) {
    this.view = CalendarView.Day;
  }

  // userChanged({event, newUser}) {
  //   event.meta.user = newUser;
  //   this.refresh.next();
  // }

  userChanged({ event, newUser }) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
  }

  // openNewBooking() {
  //   const dialogRef = this.dialog.open(BookingComponent, {
  //     width: '70%',
  //     height:'70%'
     
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
     
  //   });
  // }
}
