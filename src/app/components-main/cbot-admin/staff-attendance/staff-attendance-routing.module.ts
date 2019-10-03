import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffAttendanceComponent } from './staff-attendance.component';


const routes: Routes = [
  {
    path:'',
    component: StaffAttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffAttendanceRoutingModule { }
