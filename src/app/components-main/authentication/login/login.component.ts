import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private service : CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  this.service.logout();
  }
  validate() {
    this.router.navigate(['/beautelabs/cbot-admin/dashboard']);
  }
}
