import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

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
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  sidenavWidth = 4;  
  showSubmenu: boolean = false;
  isExpanded = true;
  private listTitles: any[];
  private toggleButton: any;
  private sidebarVisible: boolean;
  location: Location;
  mobile_menu_visible: any = 0;
  @Input() expandMenuVisible: boolean;
  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;
  constructor(private sidenavService: SidenavService,location: Location,  private element: ElementRef, private router: Router) { 
    this.location = location;
        this.sidebarVisible = false;
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.sidenavService.setSidenav(this.sidenav);    
    this.listTitles = ROUTES.filter(listTitle => listTitle);    
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
    this.sidebarClose();
    var $layer: any = document.getElementsByClassName('close-layer')[0];
    if ($layer) {
      $layer.remove();
      this.mobile_menu_visible = 0;
    }
   });
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


  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());   
    var finalString = titlee.split("/", 4);     
    // if(titlee.charAt(0) === '#'){
    //     titlee = titlee.slice(1);
    // }    
    for(var item = 0; item < this.listTitles.length; item++){      
        if(this.listTitles[item].path === finalString[3]){                    
            return this.listTitles[item].title;            
        }
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
};
sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
};
sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
        // $('html').removeClass('nav-open');
        body.classList.remove('nav-open');
        if ($layer) {
            $layer.remove();
        }
        setTimeout(function() {
            $toggle.classList.remove('toggled');
        }, 400);

        this.mobile_menu_visible = 0;
    } else {
        setTimeout(function() {
            $toggle.classList.add('toggled');
        }, 430);

        var $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');


        if (body.querySelectorAll('.main-panel')) {
            document.getElementsByClassName('main-panel')[0].appendChild($layer);
        }else if (body.classList.contains('off-canvas-sidebar')) {
            document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
        }

        setTimeout(function() {
            $layer.classList.add('visible');
        }, 100);

        $layer.onclick = function() { //asign a function
          body.classList.remove('nav-open');
          this.mobile_menu_visible = 0;
          $layer.classList.remove('visible');
          setTimeout(function() {
              $layer.remove();
              $toggle.classList.remove('toggled');
          }, 400);
        }.bind(this);

        body.classList.add('nav-open');
        this.mobile_menu_visible = 1;

    }
};

expandMenu(){
  this.isExpanded = !this.isExpanded;
  // this.sidenavService.toggle();
  this.expandMenuVisible = this.isExpanded;
  
}
}
