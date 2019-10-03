import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SupplierComponent } from 'src/app/shared/dialog/supplier/supplier.component';

export interface PeriodicElement {
  name: string;
  sno: number;
  email: string;
  mobile: string;
  refNo: string;
  city:string;
  gstNumber: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi', email: 'aashi@gmail.com', mobile: '9632587412',refNo:'3500',city:'Coimbatore', gstNumber:'33MCVFG018'},
  {sno: 2, name: 'Devi', email: 'devi@gmail.com', mobile: '7946132541',refNo:'2800',city:'Coimbatore', gstNumber:'33DSFSDF0918'},
  {sno: 3, name: 'Hari', email: 'hari56@gmail.com', mobile: '8293714612',refNo:'1200',city:'Coimbatore', gstNumber:'33EP80018'},
  {sno: 4, name: 'Jai', email: 'jai23@gmail.com', mobile: '7391827391',refNo:'7900',city:'Coimbatore', gstNumber:'33FGHFH07018'},
  {sno: 5, name: 'Latha', email: 'latha23@gmail.com', mobile: '9685741245',refNo:'1600',city:'Coimbatore', gstNumber:'33FG01092'},
  {sno: 6, name: 'Karthi', email: 'karthiaa@gmail.com', mobile: '7193827391',refNo:'9300',city:'Coimbatore', gstNumber:'33FDG2565'},
  {sno: 7, name: 'Nisha', email: 'nishasr@gmail.com', mobile: '9176947845',refNo:'800',city:'Coimbatore', gstNumber:'33FDG2565'},
  {sno: 8, name: 'Prakash', email: 'prakashuy@gmail.com', mobile: '8974654123',refNo:'15200',city:'Coimbatore', gstNumber:'33FDG2565'},
  {sno: 9, name: 'Abhinaya', email: 'abhiemp@gmail.com', mobile: '7986957454',refNo:'3500',city:'Coimbatore', gstNumber:'33FDG2565'},
  {sno: 10, name: 'Kumar', email: 'kumar24@gmail.com', mobile: '9876543214',refNo:'2800',city:'Coimbatore', gstNumber:'33FDG2565'},
  {sno: 11, name: 'Ravi', email: 'ravipoe@gmail.com', mobile: '8795462134',refNo:'3700',city:'Coimbatore', gstNumber:'33FDG2565'},
  {sno: 12, name: 'Nithya', email: 'nithyalkj@gmail.com', mobile: '9678125432',refNo:'7900',city:'Coimbatore', gstNumber:'33FDG2565'},
  {sno: 13, name: 'Anbu', email: 'anbu76@gmail.com', mobile: '7684957545',refNo:'6200',city:'Coimbatore', gstNumber:'33FDG2565'}
];
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'email', 'mobile','refNo','city','gstNumber','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  vendorList:any;
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
  constructor(private modalService: BsModalService, public dialog: MatDialog) { }
  vendorCreate(): void {
    const dialogRef = this.dialog.open(SupplierComponent, {
      width: '60%',
      data: {name: 'sfd', animal: 'dsfd'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.vendorList = this.dataSource;
    // this.vendorList.paginator = this.paginator;
    // this.vendorList.sort = this.sort;    
  }
}
