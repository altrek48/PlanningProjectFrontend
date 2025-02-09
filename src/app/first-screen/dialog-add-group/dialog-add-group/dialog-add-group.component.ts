import { Component, OnInit } from '@angular/core';
import { Group } from 'src/models/group';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.css']
})
export class DialogAddGroupComponent implements OnInit {

  creatingGroup: Group;

  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group) {
      this.creatingGroup = new Group();
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
