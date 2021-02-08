import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetItem } from './budgetItem';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(@Inject('configuration') private config: AppConfig, private http: HttpClient) { }

  getBudgets(accountId: Number) {
    let url = `${this.config.apiEndpoint}/joe/budgets?accountId=${accountId}`
    return this.http.get<BudgetItem[]>(url)
  }

  addBudgetItem(accountId: Number, categoryLabel: String, categoryDescription: String, amount ?: Number) {
    let url = `${this.config.apiEndpoint}/joe/budgets`
    let body = {"accountId": accountId, "label": categoryLabel, "description": categoryDescription, "amount": amount}
    console.log(body)
    return this.http.post<any>(url, body= body)
  }

}
