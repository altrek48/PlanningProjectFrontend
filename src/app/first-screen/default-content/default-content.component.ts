import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Profile } from 'src/models/profile';
// import { AuthService } from 'src/services/auth-service';
import { BaseService } from 'src/services/base-service';
import { LocalStorageService } from 'src/services/localStorage-service';
import { ProfileWindowComponent } from './profile-window/profile-window.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-default-content',
  templateUrl: './default-content.component.html',
  styleUrls: ['./default-content.component.css']
})
export class DefaultContentComponent implements OnInit {

  profile: Profile | null = null;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private baseService: BaseService,
    public dialog: MatDialog,
  ) { }

  logout() {
    this.localStorage.removeItem("token");
    this.router.navigate(["/login"])
  }

  ngOnInit(): void {
      this.baseService.getProfileInfo().subscribe((currentProfile: Profile) => {
        if(currentProfile != null) {
          this.profile = currentProfile;
        }
        else console.log("this profile are null");
      })
  }

  openProfile() {
    const openProfileWindow = this.dialog.open(ProfileWindowComponent, {
          width: '500px',
          data: this.profile,
        });
  }

}
