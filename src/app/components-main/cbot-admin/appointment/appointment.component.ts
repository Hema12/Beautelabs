import { Component, OnInit, ViewChild, TemplateRef, HostBinding, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import Swal from 'sweetalert2';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Router } from '@angular/router';
import timeGridPlugin from '@fullcalendar/timegrid';

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
  options: any;
  selectedService:any;
  eventsModel: any;
  showModal: boolean;  
  @ViewChild(FullCalendarComponent, {static: true}) calendarComponent: FullCalendarComponent;
  @ViewChild('externalEvents', {static:false}) public external: ElementRef;
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
  events: any = [
    {id:'1', title: 'Hair Cut', resourceId:'1', start: new Date('2019-11-20 02:30:00'),  backgroundColor:'#F3565D'},
    {id:'2',  title: 'Bleech',  resourceId:'2',start: new Date('2019-11-18 05:30:00'), backgroundColor:'##FF5722' },
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
    } else if(this.bookingStatusBg == '#FF5722') {
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
 
   constructor(private modalService: BsModalService, public dialog: MatDialog, public router: Router) { }
  
   cancelBooking(val) {
     this.bookingStatus = 'Cancelled';  
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
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek'
      },    
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin, listPlugin],    
      rerenderEvents: function() {
        console.log('tst');
        
      },
      views: {
        timeGrid: {
          eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
        },
        dayGrid: {
          eventLimit: 4
        }
      },     
      eventRender: function(event, eventElement) {
        if (event) {
            eventElement.find("div.fc-content").prepend("<span class='fc-event-dot'></span>");
        }
    },
      eventAfterRender: function (event, element) {
        (element).tooltip({title:event.title, container: "body"});
      }
    // eventAfterAllRender: function (view) {
    //   // Count events
    //     var quantity = ('.fc-event').length;
    //     console.log(quantity);
    //     return quantity;        
        
    // },
      
//       dayClick: function(date, allDay, jsEvent, view) {
//         if (!allDay) {
//           // strip time information
//           date = new Date(date.getFullYear(), date.getMonth(), date.getDay());
//         }
//         var ar =  function(event) {
//           if (event.start.year() == date.year() && event.start.month() == date.month() && event.start.day() == date.day()) {
//             return true;
//           }
//           return false;
//         };
//         console.log(ar.length);
//       },
//       eventRender: function( event, element, view,info ) {
//         element.find('.fc-title').prepend('<span>123</span> '); 
//         var tooltip = new tooltip(info.el, {
//           title: info.event.extendedProps.description,
//           placement: 'top',
//           trigger: 'hover',
//           container: 'body'
//         });
//    }
     };
     
    
}

ngAfterViewInit() {  
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

addNew(){
  SERVICE_DATA.push(this.services)
  this.dataServiceSource = new MatTableDataSource(SERVICE_DATA);
  this.services = {
    name :""
  };
  }
  selectChangeHandler (event: any) {    
    this.selectedService = event.target.value;
  }
  eventRender(event) {
 //  console.log(event);
   return event.el.innerText;
  }   
  dayRender(e) {    
    console.log(e);
  }

}
