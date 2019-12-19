import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'beautelabs';

  constructor(private router:Router) {}

//   @HostListener('window:beforeunload', ['$event'])
//   doBeforeUnload() {
//     console.log('CLosed');
//     alert('Closed');
//    // this.router.navigate(['/beautelabs/cbot-admin/sales']);
//     return false;
//   }

// doUnload() {
//     // Clear session or do something
//     console.log('Closed');
//     this.router.navigate(['/beautelabs/cbot-admin/appointment']);
//     // return false;
// }
}

