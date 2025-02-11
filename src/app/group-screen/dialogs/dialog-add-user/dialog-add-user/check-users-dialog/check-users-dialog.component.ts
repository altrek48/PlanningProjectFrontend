import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from 'src/models/profile';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from 'src/services/base-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-check-users-dialog',
  templateUrl: './check-users-dialog.component.html',
  styleUrls: ['./check-users-dialog.component.css']
})
export class CheckUsersDialogComponent implements OnInit {

  username: String | null = null;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Profile>;
  groupId: number;

  constructor(public dialog: MatDialog, private baseService: BaseService, public dialogRef: MatDialogRef<CheckUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userProfiles: Profile[], username: String, groupId: number}) {
      if(data.username != null) {
        this.displayedColumns = ['index', 'username', 'avatar', 'actions'];
      }
      else this.displayedColumns = ['index', 'username', 'avatar'];
      this.dataSource = new MatTableDataSource<Profile>(data.userProfiles ?? []);
      this.username = data.username;
      this.groupId = data.groupId;
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeUser(userId: number) {
    this.baseService.removeUserFromGroup(this.groupId, userId).subscribe((id: Number) => {
      this.dialogRef.close();
      this.baseService.getUsersProfileByGroupId(this.groupId).subscribe((updatedProfiles: Profile[]) => {
        this.dialog.open(CheckUsersDialogComponent, {
          width: '600px',
          data: {
            userProfiles: updatedProfiles,
            username: this.username,
            groupId: this.groupId
          }
        });
      });
    });
  }
}
