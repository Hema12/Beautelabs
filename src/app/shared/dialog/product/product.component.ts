import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSidenav } from '@angular/material';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

export interface productCategory {
  categoryName: string;
}
export interface productSubCategory {
  subcategoryName: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild(MatSidenav, {static: true}) productNav: MatSidenav;
  category: productCategory[] = [
    {categoryName: 'Hair Care'},
    {categoryName: 'Face Pack'},
    {categoryName: 'Face Cream'},
    {categoryName:'Shampoo'}
  ];
  subcategory: productSubCategory[] = [
    {subcategoryName: 'Hair Care'},
    {subcategoryName: 'Face Pack'},
    {subcategoryName: 'Face Cream'},
    {subcategoryName:'Shampoo'}
  ];
  constructor( public dialogRef: MatDialogRef<ProductComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productSKU: new FormControl(null, Validators.required),
      productCost: new FormControl(null, Validators.required),
      productCategory:new FormControl(null, Validators.required),
      productSubCategory:new FormControl(null, Validators.required),
      productExpiry: new FormControl(null, Validators.required),
      productBrand: new FormControl(null, Validators.required),
      productUOM: new FormControl(null),
      productHSN: new FormControl(null, Validators.required),
      productNote: new FormControl(null),
      productRetail: new FormControl(null)
    })
  }
  dobCheck(event) {
    return false;
  }
 
  cloesModal() {
    this.dialogRef.close();
  }

}
