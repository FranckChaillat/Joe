import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetItem } from './budgetItem';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(@Inject('configuration') private config: AppConfig, private http: HttpClient) { }

  getBudgets() {
    let url = `${this.config.apiEndpoint}/joe/budgets/${1}`
    return this.http.get<BudgetItem[]>(url)
  }

  addBudgetItem(categoryLabel: String, categoryDescription: String, amount ?: Number) {
    let url = `${this.config.apiEndpoint}/joe/budgets/${1}`
    let body = {"label": categoryLabel, "description": categoryDescription, "amount": amount}
    return this.http.post<any>(url, body= body)
  }

}
