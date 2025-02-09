import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from 'src/models/profile';

@Component({
  selector: 'app-profile-window',
  templateUrl: './profile-window.component.html',
  styleUrls: ['./profile-window.component.css']
})
export class ProfileWindowComponent implements OnInit {

  userProfile: Profile;

  constructor(public dialogRef: MatDialogRef<ProfileWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile) {
      this.userProfile = data;
    }
    
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
