import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatTableModule, MatNativeDateModule, MatInputModule } from '@angular/material'  
import {MatSelectModule} from '@angular/material/select';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './components/budget/budget.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaymentFilterComponent } from './components/payment-filter/payment-filter.component';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { CONFIG } from './configuration/app.config'

const appRoutes : Routes = [
  { path: 'history', component: PaymentHistoryComponent },
  { path: 'budget', component: BudgetComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    PaymentHistoryComponent,
    SidemenuComponent,
    BudgetComponent,
    PaymentFilterComponent
  ],
  imports: [
    FormsModule,
    MatInputModule, 
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
  ],
  providers: [
    MatDatepickerModule,
    DatePipe,
    { provide: 'configuration', useValue: CONFIG }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
