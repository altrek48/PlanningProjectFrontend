import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-delete-plan',
  templateUrl: './dialog-delete-plan.component.html',
  styleUrls: ['./dialog-delete-plan.component.css']
})
export class DialogDeletePlanComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<boolean>) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close("false");
  }

}
