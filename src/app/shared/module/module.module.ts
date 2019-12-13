import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyInterceptor } from '../interceptor/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule, MatInputModule,  MatSidenavModule, MatListModule, MatButtonModule, MatCardModule, MatNativeDateModule, MatProgressBarModule } from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DatePipe } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { FullCalendarModule } from '@fullcalendar/angular';


registerLocaleData(en);
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        FlexLayoutModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatCardModule,
        MatDialogModule,
        MatTabsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatGridListModule,
        MatCheckboxModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatMenuModule,
        NgSelectModule,
        MatBadgeModule,
        MatTooltipModule,
        NgxMaterialTimepickerModule,
        DatePipe,
        MatSlideToggleModule,        
        MatProgressBarModule,
        MatExpansionModule,
        FullCalendarModule                
    ],    
    providers: [
        {
        provide: HTTP_INTERCEPTORS,
        useClass: MyInterceptor,
        multi: true,
        },      
        DatePipe
    ]
})
export class SharedModule { }
