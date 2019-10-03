import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-beautelabs',
  templateUrl: './beautelabs.component.html',
  styleUrls: ['./beautelabs.component.scss']
})
export class BeautelabsComponent implements OnInit {
  loader: Boolean = false;

  constructor(private router:Router) { }

  ngOnInit() {
    this.loaderToggle();
  }
  loaderToggle() {
    this.router.events.subscribe(event => {
       if (event instanceof NavigationStart) {
         console.log(this.loader);
         
        setTimeout(()=>{    
          this.loader = false;
     }, 1000);
          
       }
       if (event instanceof NavigationEnd) {
          this.loader = true;
       }
    });
   }
}
