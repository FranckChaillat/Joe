import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatTableModule, MatNativeDateModule, MatInputModule, MatPaginatorModule, MatIconModule, MatDialogModule} from '@angular/material'  
import { MatSelectModule } from '@angular/material/select';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './components/budget/budget.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaymentFilterComponent } from './components/payment-filter/payment-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CONFIG } from './configuration/app.config';
import { ReportComponent } from './components/report/report.component'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BudgetModalComponent } from './components/budget-modal/budget-modal.component';


const appRoutes : Routes = [
  { path: 'history', component: PaymentHistoryComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'report', component: ReportComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    PaymentHistoryComponent,
    SidemenuComponent,
    BudgetComponent,
    PaymentFilterComponent,
    ReportComponent,
    BudgetModalComponent,
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxChartsModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [
    MatDatepickerModule,
    DatePipe,
    { provide: 'configuration', useValue: CONFIG }

  ],
  bootstrap: [AppComponent],
  entryComponents: [BudgetModalComponent]
})
export class AppModule { }
