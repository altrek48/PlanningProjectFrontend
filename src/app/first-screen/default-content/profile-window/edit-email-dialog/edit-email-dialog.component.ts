import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseService } from 'src/services/base-service';
@Component({
  selector: 'app-edit-email-dialog',
  templateUrl: './edit-email-dialog.component.html',
  styleUrls: ['./edit-email-dialog.component.css']
})
export class EditEmailDialogComponent implements OnInit {

  email: String | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditEmailDialogComponent>,
    private baseService: BaseService,
    @Inject(MAT_DIALOG_DATA) public data: String | null) {
      this.email = data;
    }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  confirmEdit() {
    if(this.email && this.email.length >= 7 && this.email.includes('@')) {
      this.dialogRef.close(this.email);
    }
    else console.log("email length < 7 and dont have '@'");
  }

}
