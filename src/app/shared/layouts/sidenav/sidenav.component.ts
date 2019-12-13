import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sidenavWidth = 4;  
  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;
  constructor(private router: Router, private sidenavService: SidenavService) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
  increase() {
    this.sidenavWidth = 15;
  }
  decrease() {
    this.sidenavWidth = 4;
  } 
}
