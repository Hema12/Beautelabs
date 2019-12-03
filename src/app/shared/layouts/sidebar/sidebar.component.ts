import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: 'appointment', title: 'Appointment',  icon:'person', class: '' },
  { path: 'sales', title: 'Sales',  icon:'content_paste', class: '' },
  { path: 'campaigns', title: 'Campaigns',  icon:'library_books', class: '' },
  { path: 'customers', title: 'Customers',  icon:'bubble_chart', class: '' },
  { path: 'services', title: 'Services',  icon:'location_on', class: '' },
  { path: 'products', title: 'Products',  icon:'notifications', class: '' },
  { path: 'vendors', title: 'Vendors',  icon:'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  sidenavWidth = 4;  
  showSubmenu: boolean = false;
  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;
  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.sidenavService.setSidenav(this.sidenav);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  
  increase() {
    this.sidenavWidth = 15;
  }
  decrease() {
    this.sidenavWidth = 4;
  }
}
