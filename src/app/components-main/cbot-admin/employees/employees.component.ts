import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { StaffComponent } from 'src/app/shared/dialog/staff/staff.component';
import { Observable } from 'rxjs';

export interface staffData {
  employeeFirstName: string;
  sno: number;
  employeeLastName: string;
  employeeMobile: string;
  employeeEmail: string;
  employeeStatus: string;
  employeeDesignation:string;
}

const STAFF_DATA: staffData[] = [
  {sno: 1, employeeFirstName: 'Aadhi', employeeLastName: 'M',employeeMobile: '9632587412',employeeEmail:'aadhirt@gmail.com',employeeStatus:'Active',employeeDesignation:'Manager'},
  {sno: 2, employeeFirstName: 'Devi',employeeLastName: 'Priya', employeeMobile: '7946132541',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'},
  {sno: 3, employeeFirstName: 'Hari',employeeLastName: 'Prasath', employeeMobile: '8293714612',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'},
  {sno: 4, employeeFirstName: 'Jai', employeeLastName: 'Naveen',employeeMobile: '7391827391',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'},
  {sno: 5, employeeFirstName: 'Latha',employeeLastName: 'Kumar',employeeMobile: '9685741245',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Hairstylist'},
  {sno: 6, employeeFirstName: 'Karthi',employeeLastName: 'S', employeeMobile: '7193827391',employeeEmail:'',employeeStatus:'InActive',employeeDesignation:'Stylist'},
  {sno: 7, employeeFirstName: 'Nisha',employeeLastName: 'P', employeeMobile: '9176947845',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Receptionist'},
  {sno: 8, employeeFirstName: 'Prakash', employeeLastName: 'S',employeeMobile: '8974654123',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'},
  {sno: 9, employeeFirstName: 'Abhinaya', employeeLastName: 'M',employeeMobile: '7986957454',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Manicurist'},
  {sno: 10,employeeFirstName: 'Kumar',employeeLastName: 'L', employeeMobile: '9876543214',employeeEmail:'',employeeStatus:'InActive',employeeDesignation:'Stylist'},
  {sno: 11,employeeFirstName: 'Ravi', employeeLastName: 'Kumar',employeeMobile: '8795462134',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'},
  {sno: 12,employeeFirstName: 'Nithya',employeeLastName: 'P', employeeMobile: '9678125432',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Assistant'},
  {sno: 13,employeeFirstName: 'Anbu',employeeLastName: 'S', employeeMobile: '7684957545',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'},
  {sno: 14,employeeFirstName: 'Sasi',employeeLastName: 'Kumar', employeeMobile: '9283714565',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'},
  {sno: 15,employeeFirstName: 'Zenath',employeeLastName: 'A',employeeMobile: '9879784564',employeeEmail:'',employeeStatus:'Active',employeeDesignation:'Stylist'}

];
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'employeeFirstName', 'employeeDesignation','employeeLastName', 'employeeMobile','employeeEmail','employeeStatus'];
  staffData:Observable<any>
  dataSource: MatTableDataSource<staffData> = new MatTableDataSource<staffData>(STAFF_DATA);
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  View:any;
  list: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private modalService: BsModalService, public dialog: MatDialog) { }
  staffCreate(): void {
    const dialogRef = this.dialog.open(StaffComponent, {
      width: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }


  ngOnInit() {
    this.staffData = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  openViewModal(viewtemplate: TemplateRef<any>, Value) {   
    this.View = this.list.filteredData.find(obj => obj.name === Value.name);
    this.modalRef = this.modalService.show(viewtemplate);
 }
 cancel() {
  this.modalRef.hide();
}
}
