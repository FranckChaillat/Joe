import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service'
import {PaymentFilter} from './PaymentFilter'
import { DatePipe } from '@angular/common'
import { BudgetService } from 'src/app/services/budget/budget.service';

@Component({
  selector: 'app-payment-filter',
  templateUrl: './payment-filter.component.html',
  styleUrls: ['./payment-filter.component.css']
})
export class PaymentFilterComponent implements OnInit {
  @Output() filterApply = new EventEmitter<PaymentFilter>(); 

  private filterObject: PaymentFilter = {}
  categories: String[] = ["coucou"]

  constructor(private budgetService: BudgetService, private datepipe: DatePipe) {
    this.budgetService.getBudgets(1)
    .subscribe((value) => {
      this.categories = value.map((e) => e.label)
    })
  }

  ngOnInit() { }

  applyFilters() {
    let filter : PaymentFilter = {
      startDate: (this.filterObject.startDate) ? this.datepipe.transform(this.filterObject.startDate, 'yyyy-MM-dd') : this.filterObject.startDate,
      endDate: (this.filterObject.endDate) ? this.datepipe.transform(this.filterObject.endDate, 'yyyy-MM-dd') : this.filterObject.endDate,
      category: this.filterObject.category
    }
    
    this.filterApply.emit(filter)
  }


  clearFilters() {
    this.filterObject = {}
  }

}
