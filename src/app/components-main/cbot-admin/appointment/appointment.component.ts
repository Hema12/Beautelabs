import { Component, OnInit, ViewChild, TemplateRef, HostBinding, ElementRef, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import Swal from 'sweetalert2';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Router } from '@angular/router';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventEmitter } from 'events';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

interface MyCalendarEventTimesChangedEvent extends CalendarEventTimesChangedEvent {
  droppedOutsideCalendar?: boolean;
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

export interface Service {
  name: string
}

const SERVICE_DATA: Service[] = [
  {name: 'HaiCut'},
  {name: 'Bleech'}
];
export interface Status {
  value: string;
  viewValue: string;
}
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
  startTime:string;
  eventId:string;
  listView: boolean = false;
  defaultView: boolean = true;
  endTime:string;
  staffName: string;
  source: string;
  bookedTime:string;
  resourceName: string;
  options: any;
  selectedService:any;
  selectedServiceName: string;
  eventsModel: any;
  showModal: boolean;  
  @ViewChild(FullCalendarComponent, {static: true}) calendarComponent: FullCalendarComponent;
  @ViewChild('externalEvents', {static:false}) public external: ElementRef;
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
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
  services : Service = {
    name :""
  };
  serviceList: Service[] = [
    {name: 'Hair Cut'},
    {name: 'Bleech'},
    {name: 'Facial'}
  ];
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
  eventsOld: any = [
    {id:'1', title: 'Hair Cut', resourceId:'1', start: new Date('2019-11-20 02:30:00'),  backgroundColor:'#F3565D'},
    {id:'2',  title: 'Bleech',  resourceId:'2',start: new Date('2019-11-18 05:30:00'), backgroundColor:'#fb6a3d' },
    {id:'3',  title: 'Facial',  resourceId:'1', start: new Date('2019-11-17 10:15:00'),backgroundColor:'#f14343' },
    {id:'4',  title: 'Hair Coloring', resourceId:'3', start: new Date('2019-11-16 03:00:00'),  backgroundColor:'#9B59B6' },
    {id:'5',  title: 'Tan Mask', resourceId:'3', start: new Date(),  backgroundColor:'#4d31e6' },
    {id:'6',  title: 'Body Polishing',  resourceId:'1', start: new Date('2019-11-24 11:15:00'),backgroundColor:'#1BBC9B' },
    {id:'7',  title: 'Threading',  resourceId:'1', start: new Date('2019-11-28 09:35:00'),backgroundColor:'#43bc1b' },
    {id:'8',  title: 'Body Polishing',  resourceId:'1', start: new Date('2019-11-04 12:20:00'),backgroundColor:'#6d6d6d' },
    {id:'9',  title: 'Threading',  resourceId:'1', start: new Date('2019-11-08 06:00:00'),backgroundColor:'#6d6d6d' },
    {id:'10',  title: 'Body Polishing',  resourceId:'1', start: new Date('2019-10-24 04:10:00'),backgroundColor:'#6d6d6d' },
    {id:'11',  title: 'Threading',  resourceId:'1', start: new Date('2019-09-05 10:30:00'),backgroundColor:'#6d6d6d' },
  ]; 
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
    console.log(model);
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
       // this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,      
      draggable: true
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
  ];

  activeDayIsOpen: boolean = false; 
  externalEvents: CalendarEvent[] = [{
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
          draggable: true
        }
      );
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = true;
  }
}

droppedBack(event: CalendarEvent): void {    
  const internalIndex: number = this.events.indexOf(event);
  if (internalIndex > -1) {
    this.events.splice(internalIndex, 1);
    this.externalEvents.push(event);
    this.refresh.next();
  }
}

  //  constructor(private modalService: BsModalService, public dialog: MatDialog, public router: Router, private modal: NgbModal) { }
  constructor( public router: Router, private modal: NgbModal) { }
  
   cancelBooking(val) {
     this.bookingStatus = 'Cancelled';  
   }

   addNew(ser) {
      this.externalEvents.push( { title: this.selectedServiceName,
      color: colors.blue,
      start: new Date(),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      } });
      
   }
   selService(val) {
     console.log(val);
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
        // right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek'
        // left: '',
        // center:'',
         right: ''
      },    
      buttonText: {
        today: 'Today'
      },
      // add other plugins
      // plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin, listPlugin],    
      plugins: [listPlugin],          
      views: {
        timeGrid: {
          eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
        },
        dayGrid: {
          eventLimit: 4
        }
      },     
     };
     
    
}

// ngAfterViewInit() {  
//   new Draggable(this.external.nativeElement, {
//         itemSelector: '.fc-event',
//         eventData: function(eventEl) {          
//           return {
//             title: eventEl.innerText
//           };
//         }
//     });
// }
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
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
    console.log(event);
    
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
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
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.defaultView = true;
    this.view = view;
    this.listView = false;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  showListView() {        
    this.listView = true;
    this.defaultView = false;
  }

}
