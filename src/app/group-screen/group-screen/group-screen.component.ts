import { Task } from './../../../models/task';
import { BaseService } from './../../../services/base-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/models/group';
import { Router, Params } from '@angular/router';
import { GroupService } from 'src/services/group-service';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private groupService: GroupService
  ) {
    this.groupId = activateRoute.snapshot.params["groupId"];
  }

  ngOnInit(): void {
    this.isPlanScreen = this.router.url.includes('/plans');
    this.activateRoute.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
      this.setGroupName();
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
    this.router.navigate([`home/${this.groupId}/plans/add`],
      {
        state: { columns: ["name", "actions"]}
      }
    )
  }

  createNewPurchase() {
    console.log("createNewPurchase");
    this.router.navigate([`home/${this.groupId}/costs/add`]);
  }

}
