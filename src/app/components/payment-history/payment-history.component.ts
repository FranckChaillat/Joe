import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service'
import { PaymentFilter } from '../payment-filter/PaymentFilter'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { BudgetService } from 'src/app/services/budget/budget.service';


@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  displayedColumns = ['billingDate', 'label', 'value', 'category'];
  private paymentService : PaymentService
  private budgetService : BudgetService
  private datasource : MatTableDataSource<BillingRow>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  categories: String[] = []

  constructor(service: PaymentService, budgetService: BudgetService) {
    this.paymentService = service
    this.budgetService = budgetService

    this.budgetService.getBudgets(1)
    .subscribe((value) => {
      this.categories = value.map((e) => e.label)
    })

    this.paymentService.getPayments(1)
      .subscribe((value) => {
        console.log(value)
        this.datasource = new MatTableDataSource<BillingRow>(value)
        this.datasource.paginator = this.paginator;
      })    
  }

  ngOnInit() { }

  applyFilters(filterObject : PaymentFilter) {
    this.paymentService.getPayments(1, filterObject.startDate, filterObject.endDate, filterObject.category)
      .subscribe((value) => {
        this.datasource.data = value
      })
  }

  update(newValue, id) {
      this.paymentService.updateCategory(id, newValue)
        .subscribe((response) => {
          console.log(response)
        })
  }
}
