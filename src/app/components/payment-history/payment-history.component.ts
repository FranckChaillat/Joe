import { Component, OnInit, Input } from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service'
import { PaymentFilter } from '../payment-filter/PaymentFilter'

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  displayedColumns = ['billingDate', 'label', 'value', 'category'];

  private paymentService : PaymentService
  private billingRows: BillingRow[]
  private displayedRows: BillingRow[]


  constructor(service: PaymentService) {
    this.paymentService = service
    this.paymentService.getPayments(1)
      .subscribe((value) => {
        console.log(value)
        this.billingRows = value
        this.displayedRows = value
      })
  }

  ngOnInit() { }

  applyFilters(filterObject : PaymentFilter) {
    this.paymentService.getPayments(1, filterObject.startDate, filterObject.endDate, filterObject.category)
      .subscribe((value) => {
        this.displayedRows = value
      })
  }

  update(newValue, id) {
      this.paymentService.updateCategory(id, newValue)
        .subscribe((response) => {
          console.log(response)
        })
  }
}
