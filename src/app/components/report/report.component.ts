import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report/report.service';
import { PaymentFilter } from '../payment-filter/PaymentFilter'
import { BrowserModule } from "@angular/platform-browser";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public sum: String = "N/C"
  public count: String = "N/C"
  private reportService: ReportService

  
  // line data
  lineData: any[]
  view: any[] = [700, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Days';
  yAxisLabel: string = 'Balance';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  // pie chart data
  private pieChartData: any[] = [];
  piechartView: any[] = [700, 400];
  pieChartGradient: boolean = true;
  showLegend: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = "below";
  pieChartColors = { domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]};

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }

  constructor(service: ReportService) {
    this.reportService = service
  
    let dates = this.getDefaultDate()
    this.reportService.getReports(1, dates[0], dates[1])
    .subscribe((value) => {
      this.sum = value.total.toString()
      this.count = value.totalTransactionCount.toString()
      this.pieChartData = value.reportItems.map((item) => { 
        return {
          "name": item.category, 
          "value": item.amount
        }
      })
      Object.assign(this, this.pieChartData);
    })

    this.reportService.getBalanceHistoryReport(1, dates[0], dates[1])
    .subscribe((value) => {
      this.lineData = this.getLineData(value)
      Object.assign(this, this.lineData);
    })
  }

  ngOnInit() {
  }

  applyFilters(filterObject : PaymentFilter) {
    this.reportService.getReports(1, filterObject.startDate, filterObject.endDate, filterObject.category)
      .subscribe((value) => {
        this.sum = value.total.toString()
        this.count = value.totalTransactionCount.toString()

        //TODO: factoriser
        this.pieChartData = value.reportItems.map((item) => {
          return {
            "name": item.category == null ? 'undefined' : item.category, 
            "value": item.amount
          }
        })
      })

      this.reportService.getBalanceHistoryReport(1, filterObject.startDate, filterObject.endDate)
      .subscribe((value) => {
        this.lineData = this.getLineData(value)
        Object.assign(this, this.lineData);
      })
  }

  private getDefaultDate() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let year = dateObj.getUTCFullYear();
    var day = dateObj.getUTCDay();
    return [year + '-' + month + '-01', year + '-' + month + '-' + day]
  }

  private getLineData(balanceHistory: BalanceHistory[]) {
    let values = balanceHistory.map((item) => {
      return {
        "name": item.date,
        "value": item.balance
      }
    })

    return [
      {
        "name": "Balance",
        "series": values
     }
    ]
  }

}
