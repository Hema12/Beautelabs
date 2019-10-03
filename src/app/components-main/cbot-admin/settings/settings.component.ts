import { Component, OnInit, ViewChild, TemplateRef, ViewChildren, QueryList, HostBinding } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceComponent } from 'src/app/shared/dialog/service/service.component';
import { SelectionModel } from '@angular/cdk/collections';


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
export interface membershipList {
  sno: number;
  membershipName: string;
  membershipValue: string;
  membershipValidity: string;
  membershipStatus: string;
}
export interface packageList {
  sno: number;
  packageName: string;
  packageValue: string;
  packageStatus: string;
}
export interface staffCategoryList {
  sno: number;
  staffCategoryName: string;
}
export interface membershipStatusList {
  statusName: string;
}
export interface packageStatusList {
  statusName: string;
}

const CATEGORY_DATA: categoryList[] = [
  {sno:1, serviceCategoryName:'Hair Care'},
  {sno:2, serviceCategoryName:'Face Cream'},
  {sno:3, serviceCategoryName:'Face Pack'},
  {sno:4, serviceCategoryName:'Hair Oil'},
  {sno:5, serviceCategoryName:'Shampoo'},
  {sno:6, serviceCategoryName:'Hair Brushes'},
  {sno:7, serviceCategoryName:'Lightening'}
];

const SUB_CATEGORY_DATA: subCategoryList[] = [
  {sno:1, serviceCategoryName:'Hair Care',serviceSubCategoryName:''},
  {sno:2, serviceCategoryName:'Face Cream',serviceSubCategoryName:''},
  {sno:3, serviceCategoryName:'Face Pack',serviceSubCategoryName:''},
  {sno:4, serviceCategoryName:'Hair Oil',serviceSubCategoryName:''},
  {sno:5, serviceCategoryName:'Shampoo',serviceSubCategoryName:''},
  {sno:6, serviceCategoryName:'Hair Brushes',serviceSubCategoryName:''},
  {sno:7, serviceCategoryName:'Lightening',serviceSubCategoryName:''}
];

const SERVICE_DATA: serviceList[] = [
  {sno: 1, serviceName: 'LOREAL Shampoo', serviceCategory: 'KJHGHGFHK34', servicePrice: '540',serviceSubCategory:'Hair Care',serviceDuration:'Shampoo'},
  {sno: 2, serviceName: 'LOREAL Hair Spa Cream', serviceCategory:'Hair Care',servicePrice: '1200', serviceSubCategory:'Hair Care', serviceDuration:'Cream'},
  {sno: 3, serviceName: 'Skeydnor Cleansor', serviceCategory: 'KJGHGFHKJI897', servicePrice: '800',serviceSubCategory:'Hair Care',serviceDuration:'Face Pack'},
  {sno: 4, serviceName: 'LAKME Face Cream', serviceCategory: 'HJQWDSGWERWFD877', servicePrice: '750',serviceSubCategory:'Hair Care',serviceDuration:''},
  {sno: 5, serviceName: 'LOREAL Face Mask', serviceCategory: 'JHHSDGJSGF45', servicePrice: '3500',serviceSubCategory:'Hair Care',serviceDuration:''},
  {sno: 6, serviceName: 'LAKME Peel Off Mask', serviceCategory: '-', servicePrice: '450',serviceSubCategory:'Hair Care',serviceDuration:''},
  {sno: 7, serviceName: 'REVLON Touch & Glow Moisturising Powder', serviceCategory: 'ASDESRFDSFSD3445', servicePrice: '3500',serviceSubCategory:'Hair Care',serviceDuration:''},
  {sno: 8, serviceName: 'MAYBELLINE Poreless Powder', serviceCategory: 'ASDGSFDSGDGD34', servicePrice: '670',serviceSubCategory:'',serviceDuration:''},
  {sno: 9, serviceName: 'MAYBELLINE Concealer', serviceCategory: 'MNBSDSFD4356', servicePrice: '495',serviceSubCategory:'',serviceDuration:''},
  {sno: 10, serviceName: 'BIO SANDALWOOD', serviceCategory: 'DSFDGFGDFGF', servicePrice: '340',serviceSubCategory:'',serviceDuration:''},
  {sno: 11, serviceName: 'LOREAL Lash Paradise Mascara', serviceCategory: 'FDSFDSERT5T6', servicePrice: '2540',serviceSubCategory:'',serviceDuration:''},
  {sno: 12, serviceName: 'BIO GREEN APPLE', serviceCategory: 'DSFDTRET4ETERTDFG', servicePrice: '3210',serviceSubCategory:'',serviceDuration:''},
  {sno: 13, serviceName: 'LAKME 9TO5 Natural Gel Eye Liners', serviceCategory: 'DFDGVCVSDASDWAE', servicePrice: '900',serviceSubCategory:'',serviceDuration:''},
  {sno: 14, serviceName: 'LAKME 9TO5 Naturale Foundation Drops', serviceCategory: 'OIUOLHJHJT765', servicePrice: '4500',serviceSubCategory:'',serviceDuration:''}
];

const MEMBERSHIP_DATA: membershipList[] = [
  {sno:1, membershipName:'Diamond',membershipValue:'14000',membershipValidity:'60',membershipStatus:'Active'},
  {sno:2, membershipName:'Platinum',membershipValue:'18000',membershipValidity:'90',membershipStatus:'InActive'},
  {sno:3, membershipName:'Gold',membershipValue:'8000',membershipValidity:'45',membershipStatus:'Active'},
  {sno:4, membershipName:'Silver',membershipValue:'3000',membershipValidity:'30',membershipStatus:'Active'},
  {sno:5, membershipName:'Bronze',membershipValue:'5000',membershipValidity:'40',membershipStatus:'InActive'}
];

const PACKAGE_DATA: packageList[] = [
  {sno:1, packageName:'Elegant',packageValue:'14000',packageStatus:'Active'},
  {sno:2, packageName:'Platinum',packageValue:'18000',packageStatus:'InActive'},
  {sno:3, packageName:'Gold',packageValue:'8000',packageStatus:'Active'},
  {sno:4, packageName:'Bronze',packageValue:'5000',packageStatus:'InActive'}
];

const STAFFCATEGORY_DATA: staffCategoryList[] = [
  {sno:1, staffCategoryName:'Manager'},
  {sno:2, staffCategoryName:'Stylist'},
  {sno:3, staffCategoryName:'Hairstylist'},
  {sno:4, staffCategoryName:'Receptionist'},
  {sno:5, staffCategoryName:'Manicurist'}
];
export interface PeriodicElement {
  sno: number;
  day: string;
  startTime: string;
  endTime: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, day: 'Sunday', startTime: '9:00AM', endTime: '9:00PM'},
  {sno: 2, day: 'Monday', startTime: '9:00AM', endTime: '9:00PM'},
  {sno: 3, day: 'Tuesday', startTime: '9:00AM', endTime: '9:00PM'},
  {sno: 4, day: 'Wednesday', startTime: '9:00AM', endTime: '9:00PM'},
  {sno: 5, day: 'Thursday', startTime: '9:00AM', endTime: '9:00PM'},
  {sno: 6, day: 'Friday', startTime:'9:00AM', endTime: '9:00PM'},
  {sno: 7, day: 'Saturday', startTime: '9:00AM', endTime: '9:00PM'}
];
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {  
  @HostBinding('@.disabled') disabled = true;  // Disable tab animation
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();   //Paginator for all table data source
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();  // Sort table data
  //Display table columns
  displayedColumns: string[] = ['sno', 'serviceName','serviceCategory','serviceSubCategory', 'servicePrice','serviceDuration','action'];
  displayedSubCategoryColumns: string[] = ['sno','serviceCategoryName','serviceSubCategoryName','action'];
  displayedCategoryColumns: string[] = ['sno','serviceCategoryName','action'];  
  displayedMembershipColumns: string[] = ['sno','membershipName','membershipValue','membershipValidity','membershipStatus','action'];  
  displayedPackageColumns: string[] = ['sno','packageName','packageValue','packageStatus','action'];  
  displayedStaffCategoryColumns: string[] =['sno','staffCategoryName','action'];
  //Table Source Data
  serviceCategorySource = new MatTableDataSource(CATEGORY_DATA);
  serviceSubCatgeorySource = new MatTableDataSource(SUB_CATEGORY_DATA);
  serviceSource = new MatTableDataSource(SERVICE_DATA);
  membershipSource = new MatTableDataSource(MEMBERSHIP_DATA);
  packageSource = new MatTableDataSource(PACKAGE_DATA);
  staffCategorySource = new MatTableDataSource(STAFFCATEGORY_DATA);
  modalRef: BsModalRef;
  View:any;    
  serviceCategoryList:any;
  serviceSubcategoryList:any;
  serviceList:any;
  membershipList:any;
  packageList: any;
  staffCategoryList: any;   
  entityForm:  FormGroup;
  serviceCategoryForm: FormGroup;
  serviceSubCategoryForm: FormGroup;
  membershipForm: FormGroup;
  packageForm: FormGroup;
  staffCategoryForm: FormGroup;  
  displayedWorkColumns: string[] = ['select', 'day', 'startTime', 'endTime'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sno + 1}`;
  }
  category: serviceCategory[] = [
    {value: 'Hair Care',viewValue: 'Hair Care'},
    {value: 'Face Cream',viewValue: 'Face Cream'},
    {value: 'Face Pack',viewValue: 'Face Pack'}
  ];
  memberStatus: membershipStatusList[] = [
    {statusName:'Active'},
    {statusName:'InActive'}
  ]
  packageStatus: packageStatusList[] = [
    {statusName:'Active'},
    {statusName:'InActive'}
  ]
  applyProductFilter(filterValue: string) {
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
  applyMembershipFilter(filterValue: string) {
    this.membershipSource.filter = filterValue.trim().toLowerCase();
    if (this.membershipSource.paginator) {
      this.membershipSource.paginator.firstPage();
    }
  }
  applyPackageFilter(filterValue: string) {
    this.packageSource.filter = filterValue.trim().toLowerCase();
    if (this.packageSource.paginator) {
      this.packageSource.paginator.firstPage();
    }
  }
  applyStaffCategoryFilter(filterValue: string) {
    this.staffCategorySource.filter = filterValue.trim().toLowerCase();
    if (this.staffCategorySource.paginator) {
      this.staffCategorySource.paginator.firstPage();
    }
  }

  constructor(private modalService: BsModalService, public dialog: MatDialog) { }
  productsCreate(): void {
    const dialogRef = this.dialog.open(ServiceComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
    // this.serviceList = this.serviceSource;
    this.membershipList = this.membershipSource;
    this.packageList = this.packageSource;
    this.staffCategoryList = this.staffCategorySource;
    this.entityForm = new FormGroup({
      businessName: new FormControl(null),
      contactName: new FormControl(null),
      contactNumber: new FormControl(null),
      businessEmail: new FormControl(null)
    })
    this.serviceCategoryForm = new FormGroup({
      CategoryName: new FormControl(null)
    });
    this.serviceSubCategoryForm = new FormGroup({
      categoryName: new FormControl(null),
      subCategoryName: new FormControl(null, Validators.required)
    });
    this.membershipForm = new FormGroup({
      membershipName: new FormControl(null, Validators.required),
      membershipValue: new FormControl(null),
      membershipValidity: new FormControl(null),
      membershipStatus: new FormControl(null)
    });
    this.packageForm = new FormGroup({
      packageName: new FormControl(null, Validators.required),
      packageValue: new FormControl(null),
      packageStatus: new FormControl(null)
    });
    this.staffCategoryForm = new FormGroup({
      staffCategoryName: new FormControl(null)
    });
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
    //Membership Source
    this.membershipSource.paginator = this.paginator.toArray()[3];
    this.membershipSource.sort = this.sort.toArray()[3];
    //Package Source
    this.packageSource.paginator = this.paginator.toArray()[4];
    this.packageSource.sort = this.sort.toArray()[4];

    this.staffCategorySource.paginator = this.paginator.toArray()[5];
    this.staffCategorySource.sort = this.sort.toArray()[5];
  }

  serviceCategoryCreate(categorycreatetemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(categorycreatetemplate);
  }
  serviceSubCategoryCreate(subcategorycreatetemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(subcategorycreatetemplate);
  }
  openViewModal(viewtemplate: TemplateRef<any>, Value) {   
    this.View = this.serviceList.filteredData.find(obj => obj.name === Value.name);
    this.modalRef = this.modalService.show(viewtemplate);
  }
  openMembershipCreateModal(membershipcreatetemplate: TemplateRef<any>) {   
    this.modalRef = this.modalService.show(membershipcreatetemplate);
  }
  openPackageCreateModal(packagecreatetemplate: TemplateRef<any>) {   
    this.modalRef = this.modalService.show(packagecreatetemplate);
  }
  openStaffCreateModal(staffCategorycreatetemplate: TemplateRef<any>) {   
    this.modalRef = this.modalService.show(staffCategorycreatetemplate);
  }
  cancel() {
    this.modalRef.hide();
  }
}
