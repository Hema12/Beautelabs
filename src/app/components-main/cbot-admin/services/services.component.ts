import { Component, OnInit, ViewChild, TemplateRef, ViewChildren, QueryList, HostBinding } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceComponent } from 'src/app/shared/dialog/service/service.component';


export interface categoryList {
  sno: number;
  serviceCategoryName: string;
}
export interface subCategoryList {
  sno: number;
  serviceCategoryName: string;
  serviceSubCategoryName: string;
}
export interface serviceList {
  serviceName: string;
  sno: number;
  servicePrice: string;
  serviceDuration: string;
  serviceCategory:string;
  serviceSubCategory:string;
}
export interface serviceCategory {
  value: string;
  viewValue: string;
}

const CATEGORY_DATA: categoryList[] = [
  {sno:1, serviceCategoryName:'Hair Care'},
  {sno:2, serviceCategoryName:'Face Cream'},
  {sno:3, serviceCategoryName:'Face Pack'},
  {sno:4, serviceCategoryName:'Hair Oil'},
  {sno:5, serviceCategoryName:'Shampoo'},
  {sno:6, serviceCategoryName:'Hair Brushes'},
  {sno:7, serviceCategoryName:'Lightening'}
]
const SUB_CATEGORY_DATA: subCategoryList[] = [
  {sno:1, serviceCategoryName:'Hair Care',serviceSubCategoryName:'Hair Spa'},
  {sno:2, serviceCategoryName:'Face Cream',serviceSubCategoryName:'Facial'},
  {sno:3, serviceCategoryName:'Face Pack',serviceSubCategoryName:'Bleech'},
  {sno:4, serviceCategoryName:'Hair Oil',serviceSubCategoryName:'Hair Spa'},
  {sno:5, serviceCategoryName:'Shampoo',serviceSubCategoryName:''},
  {sno:6, serviceCategoryName:'Hair Brushes',serviceSubCategoryName:'Hair Spa'},
  {sno:7, serviceCategoryName:'Lightening',serviceSubCategoryName:'Facial'}
]
const SERVICE_DATA: serviceList[] = [
  {sno: 1, serviceName: 'Facial', serviceCategory: 'KJHGHGFHK34', servicePrice: '540',serviceSubCategory:'Hair Care',serviceDuration:'1:10'},
  {sno: 2, serviceName: 'Hair Spa', serviceCategory:'Hair Care',servicePrice: '1200', serviceSubCategory:'Hair Care', serviceDuration:'00:30'},
  {sno: 3, serviceName: 'Hair Coloring', serviceCategory: 'KJGHGFHKJI897', servicePrice: '800',serviceSubCategory:'Hair Care',serviceDuration:'00:45'},
  {sno: 4, serviceName: 'Bleech', serviceCategory: 'HJQWDSGWERWFD877', servicePrice: '750',serviceSubCategory:'Hair Care',serviceDuration:'00:30'},
  {sno: 5, serviceName: 'Threading', serviceCategory: 'JHHSDGJSGF45', servicePrice: '3500',serviceSubCategory:'Hair Care',serviceDuration:'00:15'},
  {sno: 6, serviceName: 'Hair Cut', serviceCategory: '-', servicePrice: '450',serviceSubCategory:'Hair Care',serviceDuration:'00:20'},
  {sno: 7, serviceName: 'Tan Pack', serviceCategory: 'ASDESRFDSFSD3445', servicePrice: '3500',serviceSubCategory:'Hair Care',serviceDuration:'00:40'},
  {sno: 8, serviceName: 'Nech Bleeech', serviceCategory: 'ASDGSFDSGDGD34', servicePrice: '670',serviceSubCategory:'',serviceDuration:'00:30'},
  {sno: 9, serviceName: 'Waxing', serviceCategory: 'MNBSDSFD4356', servicePrice: '495',serviceSubCategory:'',serviceDuration:'01:20'},
  {sno: 10, serviceName: 'Pedicure', serviceCategory: 'DSFDGFGDFGF', servicePrice: '340',serviceSubCategory:'',serviceDuration:'01:00'},
  {sno: 11, serviceName: 'Manicure', serviceCategory: 'FDSFDSERT5T6', servicePrice: '2540',serviceSubCategory:'',serviceDuration:'00:40'},
  {sno: 12, serviceName: 'Face Lightening', serviceCategory: 'DSFDTRET4ETERTDFG', servicePrice: '3210',serviceSubCategory:'',serviceDuration:'01:30'},
  {sno: 13, serviceName: 'Bridal Makeup', serviceCategory: 'DFDGVCVSDASDWAE', servicePrice: '900',serviceSubCategory:'',serviceDuration:'02:30'},
];

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  @HostBinding('@.disabled') disabled = true;
  nav_position: string = 'end';
  onTogglePosition(position: string) {
    this.nav_position = position === 'start' ? 'end' : 'start';    
  }
  displayedColumns: string[] = ['sno', 'serviceName','serviceCategory','serviceSubCategory', 'servicePrice','serviceDuration','action'];
  displayedSubCategoryColumns: string[] = ['sno','serviceCategoryName','serviceSubCategoryName','action'];
  displayedCategoryColumns: string[] = ['sno','serviceCategoryName','action'];  
  serviceCategorySource = new MatTableDataSource(CATEGORY_DATA);
  serviceSubCatgeorySource = new MatTableDataSource(SUB_CATEGORY_DATA);
  serviceSource = new MatTableDataSource(SERVICE_DATA);
  modalRef: BsModalRef;
  View:any;
  serviceList:any;
  showModal: boolean = false;
  serviceCategoryList:any;
  serviceSubcategoryList:any;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();  
  serviceCategoryForm: FormGroup;
  serviceSubCategoryForm: FormGroup;
  category: serviceCategory[] = [
    {value: 'Hair Care',viewValue: 'Hair Care'},
    {value: 'Face Cream',viewValue: 'Face Cream'},
    {value: 'Face Pack',viewValue: 'Face Pack'}
];
  applyServiceFilter(filterValue: string) {
    this.serviceSource.filter = filterValue.trim().toLowerCase();
    if (this.serviceSource.paginator) {
      this.serviceSource.paginator.firstPage();
    }
  }
  applyCategoryFilter(filterValue: string) {
    this.serviceCategorySource.filter = filterValue.trim().toLowerCase();
    if (this.serviceCategorySource.paginator) {
      this.serviceCategorySource.paginator.firstPage();
    }
  }
  applySubCategoryFilter(filterValue: string) {
    this.serviceSubCatgeorySource.filter = filterValue.trim().toLowerCase();
    if (this.serviceSubCatgeorySource.paginator) {
      this.serviceSubCatgeorySource.paginator.firstPage();
    }
  }

  constructor(private modalService: BsModalService, public dialog: MatDialog) { }
  serviceCreate(): void {
    const dialogRef = this.dialog.open(ServiceComponent, {
      width: '70%',
      height:'60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
    this.serviceList = this.serviceSource;
    this.serviceCategoryForm = new FormGroup({
      CategoryName: new FormControl(null)
    });
    this.serviceSubCategoryForm = new FormGroup({
      categoryName: new FormControl(null),
      subCategoryName: new FormControl(null, Validators.required)
    })
  }
  ngAfterViewInit() {
    //Category Source
    this.serviceCategorySource.paginator = this.paginator.toArray()[0];
    this.serviceCategorySource.sort = this.sort.toArray()[0];
    //Sub category source
    this.serviceSubCatgeorySource.paginator = this.paginator.toArray()[1];
    this.serviceSubCatgeorySource.sort = this.sort.toArray()[1];
    //Service Source
    this.serviceSource.paginator = this.paginator.toArray()[2];
    this.serviceSource.sort = this.sort.toArray()[2];
  }

  serviceCategoryCreate(categorycreatetemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(categorycreatetemplate);
  }
  serviceSubCategoryCreate(subcategorycreatetemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(subcategorycreatetemplate);
  }
  openViewModal(Value) {   
    this.showModal = true;
    this.View = this.serviceList.filteredData.find(obj => obj.name === Value.name);
 }
 viewService(serviceviewtemplate: TemplateRef<any>,value) {
    this.View = this.serviceList.filteredData.find(obj => obj.name === value.name);
   this.modalRef = this.modalService.show(serviceviewtemplate);
 }
 cancel() {
  this.modalRef.hide();
}
hide() {
  this.showModal = false;
}
sideNavToggle(sideNav, val) {
  sideNav.toggle();   
  this.View = this.serviceList.filteredData.find(obj => obj.sno === val.sno);   
}
}
