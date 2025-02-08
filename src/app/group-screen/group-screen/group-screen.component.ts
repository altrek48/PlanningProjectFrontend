import { Task } from './../../../models/task';
import { BaseService } from './../../../services/base-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/models/group';
import { Router, Params } from '@angular/router';
import { GroupService } from 'src/services/group-service';
import { DialogAddUserComponent } from '../dialogs/dialog-add-user/dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { CheckUsersDialogComponent } from '../dialogs/dialog-add-user/dialog-add-user/check-users-dialog/check-users-dialog.component';
import { Profile } from 'src/models/profile';

@Component({
  selector: 'app-group-screen',
  templateUrl: './group-screen.component.html',
  styleUrls: ['./group-screen.component.css']
})
export class GroupScreenComponent implements OnInit {

  groupId: number;
  groups: Group[] = [];
  currentGroupName: string = '';
  isPlanScreen: boolean = true;
  isGroupCreator: boolean = false;

  constructor(
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private baseService: BaseService,
  ) {
    this.groupId = activateRoute.snapshot.params["groupId"];
  }

  ngOnInit(): void {
    this.isPlanScreen = this.router.url.includes('/plans');
    this.activateRoute.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
      this.setGroupName();
      this.baseService.isGroupCreator(this.groupId).subscribe((result: boolean) => {
        this.isGroupCreator = result;
        console.log("new isGroupCreator search");
      })
    });
    this.router.events.subscribe(() => {
      this.isPlanScreen = this.router.url.includes('/plans');
    });
    if(history.state.groups) {
      this.groups = history.state.groups;
      console.log("all groups:", this.groups);
      console.log("History state groups:", history.state.groups);
      this.setGroupName();
    }
    else {
      this.loadGroups();
    }
  }

  loadGroups() {
    this.groupService.loadGroups().subscribe({
      next: (data) => {
        this.groups = data;
        this.setGroupName();
      }
    });
  }

  setGroupName() {
    const currentGroup = this.groups.find(group => group.id === this.groupId);
    if(currentGroup) {
      this.currentGroupName = currentGroup.name;
    }
  }

  routeToPlans(groupId: number) {
    this.router.navigate([`home/${groupId}/plans`]);
  }

  routeToCosts(groupId: number) {
    this.router.navigate([`home/${groupId}/costs`]);
  }

  createNewPlan() {
    console.log("createNewPlan");
    this.router.navigate([`home/${this.groupId}/plans/add`])
  }

  createNewPurchase() {
    console.log("createNewPurchase");
    this.router.navigate([`home/${this.groupId}/costs/add`]);
  }

  addUser() {
    const dialogAddUser = this.dialog.open(DialogAddUserComponent, {
          width: '600px',
        });
        dialogAddUser.afterClosed().subscribe((result: String) => {
          //console.log("username: " , result);
          if (result.length >= 3) {
            this.baseService.addUserToGroup(this.groupId, result).subscribe(() => {

            });
          }
          else {
            console.log("Недостаточно символов в username");
          }
        });
  }

  checkUsersInGroup() {
    this.baseService.getUsersProfileByGroupId(this.groupId).subscribe((profiles: Profile[]) => {
      if(this.isGroupCreator) {
        this.baseService.getUsername().subscribe((username: String) => {
          const dialogCheckUsers = this.dialog.open(CheckUsersDialogComponent, {
            width: '600px',
            data: {
              userProfiles: profiles,
              username,
              groupId: this.groupId
            }
          });
        })
      }
      else {
        const dialogCheckUsers = this.dialog.open(CheckUsersDialogComponent, {
          width: '600px',
          data: {
            userProfiles: profiles,
            username: null,
            groupId: this.groupId
          }
        });
      }
    });
  }


}
