import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(@Inject('configuration') private config: AppConfig, private http: HttpClient) { }

  getPayments(accountId: Number, startDate?: String, endDate?: String, category?: String) {
    let baseUri = `${this.config.apiEndpoint}/joe/payments?accountId=${accountId}`
    let queryFilters = [] 
    if(startDate != undefined) {
      queryFilters.push(`startDate=${startDate}`)
    }
    if(endDate != undefined) {
      queryFilters.push(`endDate=${endDate}`)
    }
    if(category != undefined) {
      queryFilters.push(`categories=${category}`)
    }
    let fullUri = `${baseUri}${(queryFilters.length > 0) ? `&${queryFilters.join("&")}` : ""}`
    return this.http.get<BillingRow[]>(fullUri)
  }


  getCategories() : String[] {
    return ["Food", "Others", "Enjoy", "Car"]
  }

  updateCategory(id: string, newCategory : string) {
    let uri = `${this.config.apiEndpoint}/joe/payments/${id}`
    let body = { "accountId": 1, "category": newCategory }
    console.log(uri)
    return this.http.put<any>(uri, body= body)
  }
}
