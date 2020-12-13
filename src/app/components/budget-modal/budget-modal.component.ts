import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BudgetItem } from 'src/app/services/budget/budgetItem';


@Component({
  selector: 'app-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.css']
})
export class BudgetModalComponent{

  constructor(
    public dialogRef: MatDialogRef<BudgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BudgetItem) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
