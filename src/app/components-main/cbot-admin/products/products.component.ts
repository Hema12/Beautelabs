import { Component, OnInit, ViewChild, TemplateRef, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSidenav } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DialogPosition} from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProductComponent } from 'src/app/shared/dialog/product/product.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


export interface categoryList {
  sno: number;
  productCategoryName: string;
}
export interface subCategoryList {
  sno: number;
  productCategoryName: string;
  productSubCategoryName: string;
}
export interface productList {
  productName: string;
  sno: number;
  productSKU: string;
  productPrice: string;
  productQuantity: string;
  productCategory:string;
  productSubCategory:string;
}
export interface productCategory {
  value: string;
  viewValue: string;
}

const CATEGORY_DATA: categoryList[] = [
  {sno:1, productCategoryName:'Hair Care'},
  {sno:2, productCategoryName:'Face Cream'},
  {sno:3, productCategoryName:'Face Pack'},
  {sno:4, productCategoryName:'Hair Oil'},
  {sno:5, productCategoryName:'Shampoo'},
  {sno:6, productCategoryName:'Hair Brushes'},
  {sno:7, productCategoryName:'Lightening'}
]
const SUB_CATEGORY_DATA: subCategoryList[] = [
  {sno:1, productCategoryName:'Hair Care',productSubCategoryName:''},
  {sno:2, productCategoryName:'Face Cream',productSubCategoryName:''},
  {sno:3, productCategoryName:'Face Pack',productSubCategoryName:''},
  {sno:4, productCategoryName:'Hair Oil',productSubCategoryName:''},
  {sno:5, productCategoryName:'Shampoo',productSubCategoryName:''},
  {sno:6, productCategoryName:'Hair Brushes',productSubCategoryName:''},
  {sno:7, productCategoryName:'Lightening',productSubCategoryName:''}
]
const PRODUCT_DATA: productList[] = [
  {sno: 1, productName: 'LOREAL Shampoo', productSKU: 'KJHGHGFHK34', productPrice: '540',productQuantity:'10',productCategory:'Hair Care',productSubCategory:'Shampoo'},
  {sno: 2, productName: 'LOREAL Hair Spa Cream', productSKU: 'KJH8GFHGFH789', productPrice: '1200',productQuantity:'5',productCategory:'Hair Care',productSubCategory:'Cream'},
  {sno: 3, productName: 'Skeydnor Cleansor', productSKU: 'KJGHGFHKJI897', productPrice: '800',productQuantity:'7',productCategory:'Face Cream',productSubCategory:'Face Pack'},
  {sno: 4, productName: 'LAKME Face Cream', productSKU: 'HJQWDSGWERWFD877', productPrice: '750',productQuantity:'30',productCategory:'',productSubCategory:''},
  {sno: 5, productName: 'LOREAL Face Mask', productSKU: 'JHHSDGJSGF45', productPrice: '3500',productQuantity:'8',productCategory:'',productSubCategory:''},
  {sno: 6, productName: 'LAKME Peel Off Mask', productSKU: '-', productPrice: '450',productQuantity:'20',productCategory:'',productSubCategory:''},
  {sno: 7, productName: 'REVLON Touch & Glow Moisturising Powder', productSKU: 'ASDESRFDSFSD3445', productPrice: '3500',productQuantity:'80',productCategory:'',productSubCategory:''},
  {sno: 8, productName: 'MAYBELLINE Poreless Powder', productSKU: 'ASDGSFDSGDGD34', productPrice: '670',productQuantity:'15',productCategory:'',productSubCategory:''},
  {sno: 9, productName: 'MAYBELLINE Concealer', productSKU: 'MNBSDSFD4356', productPrice: '495',productQuantity:'35',productCategory:'',productSubCategory:''},
  {sno: 10, productName: 'BIO SANDALWOOD', productSKU: 'DSFDGFGDFGF', productPrice: '340',productQuantity:'28',productCategory:'',productSubCategory:''},
  {sno: 11, productName: 'LOREAL Lash Paradise Mascara', productSKU: 'FDSFDSERT5T6', productPrice: '2540',productQuantity:'7',productCategory:'',productSubCategory:''},
  {sno: 12, productName: 'BIO GREEN APPLE', productSKU: 'DSFDTRET4ETERTDFG', productPrice: '3210',productQuantity:'5',productCategory:'',productSubCategory:''},
  {sno: 13, productName: 'LAKME 9TO5 Natural Gel Eye Liners', productSKU: 'DFDGVCVSDASDWAE', productPrice: '900',productQuantity:'20',productCategory:'',productSubCategory:''},
  {sno: 14, productName: 'LAKME 9TO5 Naturale Foundation Drops', productSKU: 'OIUOLHJHJT765', productPrice: '4500',productQuantity:'3',productCategory:'',productSubCategory:''}
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  nav_position: string = 'end';
  onTogglePosition(position: string) {
    this.nav_position = position === 'start' ? 'end' : 'start';
    
  }
  displayedColumns: string[] = ['sno', 'productName','productCategory','productSubCategory', 'productSKU', 'productPrice','productQuantity','action'];
  displayedSubCategoryColumns: string[] = ['sno','productCategoryName','productSubCategoryName','action'];
  displayedCategoryColumns: string[] = ['sno','productCategoryName','action'];  
  productCategorySource = new MatTableDataSource(CATEGORY_DATA);
  productSubCatgeorySource = new MatTableDataSource(SUB_CATEGORY_DATA);
  productSource = new MatTableDataSource(PRODUCT_DATA);
  modalRef: BsModalRef;
  View:any;
  productList:any;
  productCategoryList:any;
  productSubcategoryList:any;
  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  // @ViewChild(MatPaginator, {static: true}) categoryPaginator: MatPaginator;
  // @ViewChild(MatPaginator, {static: true}) subCategoryPaginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  animal: string;
  name: string;
  showModal: boolean = false;
  productCategoryForm: FormGroup;
  productSubCategoryForm: FormGroup;
  category: productCategory[] = [
    {value: 'Hair Care',viewValue: 'Hair Care'},
    {value: 'Face Cream',viewValue: 'Face Cream'},
    {value: 'Face Pack',viewValue: 'Face Pack'}
];
  applyProductFilter(filterValue: string) {
    this.productSource.filter = filterValue.trim().toLowerCase();
    if (this.productSource.paginator) {
      this.productSource.paginator.firstPage();
    }
  }
  applyCategoryFilter(filterValue: string) {
    this.productCategorySource.filter = filterValue.trim().toLowerCase();
    if (this.productCategorySource.paginator) {
      this.productCategorySource.paginator.firstPage();
    }
  }
  applySubCategoryFilter(filterValue: string) {
    this.productSubCatgeorySource.filter = filterValue.trim().toLowerCase();
    if (this.productSubCatgeorySource.paginator) {
      this.productSubCatgeorySource.paginator.firstPage();
    }
  }

  constructor(private modalService: BsModalService, public dialog: MatDialog) { }
  productCreate(): void {
    const dialogPosition: DialogPosition = {
      top: '0px',
      right:'0px'
    };
    const dialogRef = this.dialog.open(ProductComponent, {     
      // position: dialogPosition,
      width:'50%',
      height:'50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    //Category List
  //   this.productCategorySource.paginator = this.categoryPaginator;
  //   this.productCategorySource.sort = this.sort;
  //   console.log(this.productCategorySource.paginator);
    
  //   this.productCategoryList = this.productCategorySource;
  //  // Sub Category List
  //   this.productSubCatgeorySource.paginator = this.subCategoryPaginator;
  //   this.productSubCatgeorySource.sort = this.sort;
  //   console.log(this.productSubCatgeorySource.paginator);
  //   this.productSubcategoryList = this.productSubCatgeorySource;
  //    //Product List
  //   this.productSource.paginator = this.productPaginator;
  //   this.productSource.sort = this.sort;
  //   console.log(this.productSource.paginator);
    this.productList = this.productSource;
    this.productCategoryForm = new FormGroup({
      productCategoryName: new FormControl(null)
    });
    this.productSubCategoryForm = new FormGroup({
      categoryName: new FormControl(null),
      subCategoryName: new FormControl(null, Validators.required)
    })
  }
  ngAfterViewInit() {
    //Category Source
    // this.productCategorySource.paginator = this.paginator.toArray()[0];
    // this.productCategorySource.sort = this.sort.toArray()[0];
    //Sub category source
    // this.productSubCatgeorySource.paginator = this.paginator.toArray()[1];
    // this.productSubCatgeorySource.sort = this.sort.toArray()[1];
    //Product Source
    this.productSource.paginator = this.paginator;
    this.productSource.sort = this.sort;
  }

  productCategoryCreate(categorycreatetemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(categorycreatetemplate);
  }
  productSubCategoryCreate(subcategorycreatetemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(subcategorycreatetemplate);
  }
//   openViewModal(viewtemplate: TemplateRef<any>, Value) {   
//     this.View = this.productList.filteredData.find(obj => obj.name === Value.name);
//     this.modalRef = this.modalService.show(viewtemplate);
//  }
 cancel() {
  this.modalRef.hide();
}
 sideNavToggle(sideNav, val) {
   sideNav.toggle();   
   this.View = this.productList.filteredData.find(obj => obj.sno === val.sno);   
 }
 openViewModal(Value) {   
  this.showModal = true;
  this.View = this.productList.filteredData.find(obj => obj.sno === Value.sno);
}
hide() {
  this.showModal = false;
}
}
