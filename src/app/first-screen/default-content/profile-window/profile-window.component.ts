import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from 'src/models/profile';
import { AvatarEditDialogComponent } from '../avatar-edit-dialog/avatar-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/services/base-service';
import { Router } from '@angular/router';
import { EditEmailDialogComponent } from './edit-email-dialog/edit-email-dialog.component';

@Component({
  selector: 'app-profile-window',
  templateUrl: './profile-window.component.html',
  styleUrls: ['./profile-window.component.css']
})
export class ProfileWindowComponent implements OnInit {

  userProfile: Profile;

  constructor(
    public dialogRef: MatDialogRef<ProfileWindowComponent>,
    public dialog: MatDialog,
    private baseService: BaseService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Profile) {
      this.userProfile = data;
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openAvatarEditDialog() {
    const openAvatarEditDialog = this.dialog.open(AvatarEditDialogComponent, {
      width: '500px'
    });
    openAvatarEditDialog.afterClosed().subscribe((result) => {
      if(result) {
        const formData = new FormData();
        formData.append('file', result);
        this.baseService.uploadNewAvatar(formData).subscribe((avatarUrl) => {
          console.log("avatar Url: ", avatarUrl);
          this.dialogRef.close();
          this.baseService.getProfileInfo().subscribe((result: Profile) => {
            if(result != null) {
              this.dialog.open(ProfileWindowComponent, {
                width: '500px',
                data: result,
              })
              this.userProfile = result;
            }
            else console.log("this proofile is null");
          })
        })
      }
      else console.log("avatar is null");
    })
  }

  changeEmail() {
    const openEditEmailDialog = this.dialog.open(EditEmailDialogComponent, {
      width: '500px',
      data: this.userProfile.email
    });
    //todo доделать корректное обновление страницы после изменения email(возможно и аватарки)
    openEditEmailDialog.afterClosed().subscribe((email: String) => {
      if(email && email.length >= 7 && email.includes('@')) {
        this.baseService.updateEmail(email).subscribe((result: String) => {
          console.log("email: ", email);
          this.dialogRef.close();
          this.baseService.getProfileInfo().subscribe((updatedProfile) => {
            this.userProfile = updatedProfile;
          });
          this.router.navigate(["/home"]);
        })
      }
    })
  }

}
