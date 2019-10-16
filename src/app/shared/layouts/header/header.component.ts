import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //toggleActive:boolean = false; 
  isExpanded = false;
  element: HTMLElement;

  

  constructor(private sidenav: SidenavService) {

   }

  ngOnInit() {
  }
  // toggleRightSidenav() {
  //   this.toggleActive = !this.toggleActive;
  //   console.log(this.toggleActive);
    
  //   this.sidenav.toggle();
  // }
  toggleActive(event:any){
    debugger;
    event.preventDefault();
    if(this.element !== undefined){
      this.element.style.backgroundColor = "white";
    } 
    var target = event.currentTarget;
    target.style.backgroundColor = "#e51282";
    this.element = target;
  }
  openDrawer() {
    this.isExpanded != this.isExpanded;
    this.sidenav.toggle();
  }
 
}
