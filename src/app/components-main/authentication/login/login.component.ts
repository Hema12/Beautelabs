import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import {
  slideInLeftAnimation,
  slideInRightAnimation,
  slideOutLeftAnimation,
  slideOutRightAnimation,
} from 'angular-animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations: [
  //   slideInLeftAnimation(),
  //   slideInRightAnimation(),
  //   slideOutLeftAnimation(),
  //   slideOutRightAnimation(),   
  //   trigger('slideMenu', [
  //     state('false', style({
  //       transform: 'translateX(-250px)',
  //       display: 'none'
  //     })),
  //     state('true', style({
  //       transform: 'translateX(0)'
  //     })),
  //     transition('true <=> false', animate('400ms ease-in-out'))
  //   ]),    
  //   trigger('slideAnimation', [
  //     state('false', style({
  //       transform: 'translateX(250px)',
  //       display: 'none'
  //     })),
  //     state('true', style({
  //       transform: 'translateX(250)'
  //     })),
  //     transition('true <=> false', animate('400ms ease-in-out'))
  //   ]),    
  // ],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        backgroundColor: 'green',
        width: '100px',
        height: '100px'
      })),
      state('final', style({
        backgroundColor: 'red',
        width: '200px',
        height: '200px'
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
    trigger('flyIn', [
          state('showLogin', style({
            // transform: 'translateX(-10%)'
           transform: 'translateX(0px)',
            //  left:'0%'
          })),
          state('showSignUp', style({
            // transform : 'translateX(1000px)',
            right:'-60%'
          })),
          transition('showLogin => showSignUp', animate('400ms ease-out')),
          transition('showSignUp => showLogin', animate('400ms ease-in')),                 
         ]),
         trigger('flyOut', [
          state('showLogin', style({
            // transform: 'translateX(-10%)'
            right:'0%',
            // transform: 'translateX(0px)'
          })),
          state('showSignUp', style({
            // transform : 'translateX(830px)',   
            left:'52%'         
          })),
          transition('showLogin => showSignUp', animate('400ms ease-out')),
          transition('showSignUp => showLogin', animate('400ms ease-in')),                 
         ]),    
    ],
  
  
})
export class LoginComponent implements OnInit {
  loginShow: boolean = true;
  signUpshow: boolean = false;
  isIn = true;
  left = true;
  currentState = 'initial';
  signUp = false;
  visibility = 'visible';
  isVisible = 'showLogin';
  isSignUpVisible = 'showSignUp';
  selectedIndex: number = 0;
  maxNumberOfTabs: number = 3;
  heroes = [
    { id: 11, name: 'Mr. Nice', state: 'inactive' },
    { id: 12, name: 'Narco', state: 'active' },
    { id: 13, name: 'Bombasto', state: 'inactive' },
    { id: 14, name: 'Celeritas', state: 'active' },
    { id: 15, name: 'Magneta', state: 'active' },
    { id: 16, name: 'RubberMan', state: 'active' },
  ];
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
  signupPageShow() {
    this.loginShow = false;
    this.signUpshow = true;
  }

  loginPageShow() {
    this.loginShow = true;
    this.signUpshow = false;
  }


  get right() {
    return !this.left;
  }

  get isOut() {
    return !this.isIn;
  }
  rightIn() {
    this.isIn = true;
    this.left = false;
    this.visibility = 'visible';
  }

  leftIn() {
    this.isIn = true;
    this.left = true;
    this.visibility = 'visible';
  }

  rightOut() {
    this.isIn = false;
    this.left = false;
    this.signUp = true;
  }

  leftOut() {
    this.isIn = false;
    this.left = true;
  }
  afterOut() {    
    if (this.isOut) {
      this.visibility = 'hidden';
    }
  }
  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }


  toggleState(i) {
    this.heroes[i].state = (this.heroes[i].state === 'active' ? 'inactive' : 'active');
  }
  
  hideSignUp() {    
    this.isVisible = this.isVisible === 'showLogin' ? 'showSignUp' : 'showLogin';    
  }
  hideLogin() {
    this.isVisible = this.isVisible === 'showSignUp' ? 'showLogin' : 'showSignUp';   
  }
  changePage(val) {
    this.isVisible = val ;  
    console.log(this.isVisible);
    if(this.isVisible == 'showSignUp')  {
      this.loginShow = false;
      this.signUpshow = true;
    }
    if(this.isVisible == 'showLogin')  {
      this.loginShow = true;
      this.signUpshow = false;
    }    
  }

  nextStep() {
    if (this.selectedIndex != this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }    
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  thirdStep() {    
    this.selectedIndex = this.selectedIndex + 3;        
  }

  loginForm() {    
    this.selectedIndex = this.selectedIndex - 3;
  }

}
