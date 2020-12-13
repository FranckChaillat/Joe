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


  private single: any[] = [];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = "below";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  onSelect(data): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  constructor(service: ReportService) {
    this.reportService = service
  
    let dates = this.getDefaultDate()
    this.reportService.getReports(1, dates[0], dates[1])
    .subscribe((value) => {
      this.sum = value.total.toString()
      this.count = value.totalTransactionCount.toString()
      this.single = value.reportItems.map((item) => { 
        return {
          "name": item.category, 
          "value": item.amount
        }
      })
      console.log(this.single)
      Object.assign(this, this.single);
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
        this.single = value.reportItems.map((item) => {
          return {
            "name": item.category == null ? 'undefined' : item.category, 
            "value": item.amount
          }
        })
        console.log(this.single)
      })
  }

  private getDefaultDate() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let year = dateObj.getUTCFullYear();
    var day = dateObj.getUTCDay();
    return [year + '-' + month + '-01', year + '-' + month + '-' + day]
  }

}
