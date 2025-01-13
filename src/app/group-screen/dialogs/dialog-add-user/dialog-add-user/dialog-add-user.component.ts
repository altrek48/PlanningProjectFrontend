import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css']
})
export class DialogAddUserComponent implements OnInit {

  username: String = "";

  constructor(public dialogRef: MatDialogRef<String>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser(): void {
    this.dialogRef.close(this.username);
  }

}
