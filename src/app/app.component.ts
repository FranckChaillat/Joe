import { Component } from '@angular/core';
import {PaymentService} from './services/payment/payment.service'
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AccountManager';
  
  props: {}
  
  constructor(paymentService: PaymentService) {
    
    this.props = {
      billingRows : paymentService.getPayments(),
      categories: paymentService.getCategories() }
  }

}
