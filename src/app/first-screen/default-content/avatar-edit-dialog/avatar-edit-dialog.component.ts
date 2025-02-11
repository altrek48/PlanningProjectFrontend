import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-avatar-edit-dialog',
  templateUrl: './avatar-edit-dialog.component.html',
  styleUrls: ['./avatar-edit-dialog.component.css']
})
export class AvatarEditDialogComponent implements OnInit {

  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AvatarEditDialogComponent>) {}

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  save() {
    this.dialogRef.close(this.selectedFile);
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
