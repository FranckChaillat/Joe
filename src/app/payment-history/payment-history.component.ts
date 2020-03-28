import { Component, OnInit, Input } from '@angular/core';
import {PaymentService} from '../services/payment/payment.service'
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  @Input() props: { billingRows: BillingRow[], categories: String[] }
  displayedColumns = ['billingDate', 'label', 'value', 'category'];

  private paymentService : PaymentService

  constructor(service: PaymentService) {
    this.paymentService = service
  }

  ngOnInit() { }

  update(newValue, id) {
    let element = this.props.billingRows.find(e => e.id === id)
    if(element.category != newValue){
      element.category = newValue
      this.paymentService.updateCategory(element.id, newValue)
    }
    console.log(this.props.billingRows)
  }

}
