import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { ProductsComponent } from '../../components-main/cbot-admin/products/products.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private router:Router,
  ) { }
  private sidenav: MatSidenav;
  public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

  logout() {
    // localStorage.removeItem('currentUser');
    // this.router.navigate(['/login']);
  }

  // postService(url, data?: any): any {
  //   console.log('file', data)
  //   return this.http.post(environment.domain + url, data).pipe(map(res => res),
  //     catchError((err) => { return throwError(err) })
  //   )
  // }

  // updateService(url, data?: any): any {
  //   return this.http.patch(environment.domain + url, data).pipe(map(res => res),
  //     catchError((err) => { return throwError(err) })
  //   )
  // }

  // getService(url): any {
  //   console.log('i1d', environment.domain + url);
  //   return this.http.get(environment.domain + url).pipe(map(res => res),
  //     catchError((err) => { return throwError(err) })
  //   )
  // }

  // deleteService(url): any {
  //   return this.http.delete(environment.domain + url).pipe(map(res => res),
  //     catchError((err) => { return throwError(err) })
  //   )
  // }
}

/* **Use this common method for calling these service***
 method() {
  let url = "/api/path1/path2";
  this.service.service(url).subscribe(res => {
    if (res.status == 200) {
    }
  }, error => {
  })
}
***********************************************/

