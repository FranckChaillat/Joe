import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(@Inject('configuration') private config: AppConfig, private http: HttpClient) { }

  getReports(accountId: Number, startDate?: String, endDate?:String, category?: String) {
    let baseUri = `${this.config.apiEndpoint}/joe/reports?accountId=${accountId}`
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
    console.log(fullUri)
    return this.http.get<Report>(fullUri)
  }

  getBalanceHistoryReport(accountId: Number, startDate?: String, endDate?:String) {
    let baseUri = `${this.config.apiEndpoint}/joe/reports/balance?accountId=${accountId}`
    let queryFilters = [] 
    if(startDate != undefined) {
      queryFilters.push(`startDate=${startDate}`)
    }
    if(endDate != undefined) {
      queryFilters.push(`endDate=${endDate}`)
    }
    let fullUri = `${baseUri}${(queryFilters.length > 0) ? `&${queryFilters.join("&")}` : ""}`

    return this.http.get<BalanceHistory[]>(fullUri)
  }

}
