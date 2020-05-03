import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service'
import {PaymentFilter} from './PaymentFilter'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-payment-filter',
  templateUrl: './payment-filter.component.html',
  styleUrls: ['./payment-filter.component.css']
})
export class PaymentFilterComponent implements OnInit {
  @Output() filterApply = new EventEmitter<PaymentFilter>(); 

  private filterObject: PaymentFilter = {}

  constructor(private paymentService: PaymentService, private datepipe: DatePipe) { }

  ngOnInit() { }

  applyFilters() {
    let filter : PaymentFilter = {
      startDate: (this.filterObject.startDate) ? this.datepipe.transform(this.filterObject.startDate, 'dd/MM/yyyy') : this.filterObject.startDate,
      endDate: (this.filterObject.endDate) ? this.datepipe.transform(this.filterObject.endDate, 'dd/MM/yyyy') : this.filterObject.endDate,
      category: this.filterObject.category
    }
    
    this.filterApply.emit(filter)
  }

}
