import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  getPayments(): BillingRow[] {
    return [
      {id: uuid.v4(), value: 10, label:  "gros tacos", billingDate: "2019-12-05", category: "others"},
      {id: uuid.v4(), value: 620, label: "loyer", billingDate: "2019-11-05", category: "food"},
      {id: uuid.v4(), value: 1900, label: "voiture", billingDate: "2019-01-30", category: "car"}
    ]
  }


  getCategories() : String[] {
    return ["Food", "Others", "Enjoy", "Car"]
  }

  updateCategory(id: string, newCategory : string) {
    
  }
}
