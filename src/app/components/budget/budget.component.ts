import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BudgetModalComponent } from '../budget-modal/budget-modal.component';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { BudgetItem } from 'src/app/services/budget/budgetItem';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  private datasource : MatTableDataSource<BudgetItem>
  private budgetObject: any

  displayedColumns = ['label', 'description', 'amount'];


  constructor(public dialog: MatDialog, private service: BudgetService) {
    this.service.getBudgets(1)
    .subscribe((value) => {
      this.datasource = new MatTableDataSource<BudgetItem>(value)
    })
  }

  openDialog(): void {
    this.budgetObject = {
      "label" : "",
      "description": "",
      "amount": ""
    }
    const dialogRef = this.dialog.open(BudgetModalComponent, 
      { width: '350px',
        data : this.budgetObject
      });

    dialogRef.afterClosed().subscribe(result => {
     let rx = new RegExp('^\\d*$')
      if(result && rx.test(result.amount)) {
        this.service.addBudgetItem(1, result.label, result.description, Number(result.amount))
        .subscribe((response) => console.log(response))
      }
    });
  }

  ngOnInit() {
  }

}
