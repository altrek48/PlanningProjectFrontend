import { BaseService } from './../../../services/base-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/models/group';
import { Router, Params } from '@angular/router';
import { GroupService } from 'src/services/group-service';

@Component({
  selector: 'app-plain-screen',
  templateUrl: './plain-screen.component.html',
  styleUrls: ['./plain-screen.component.css']
})
export class PlainScreenComponent implements OnInit {

  groupId: number;
  groups: Group[] = [];
  tasks: Task[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private baseService: BaseService
  ) {
    this.groupId = activateRoute.snapshot.params["groupId"];
    const state = history.state;
    if(history.state.groups) {
      this.groups = history.state.groups;
      console.log("all groups:", this.groups);
    }
  }

  ngOnInit(): void {
    // this.initialize();

    //при изменении параметра маршрута:
    //              !!при переходе из родительского компонента метод initialize вызывается дважды(нужно пофиксить)
    this.activateRoute.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
      this.initialize();
    });
  }

  initialize() {
    console.log("selected groupId:", this.groupId);
    if (history.state.groups) {
      this.groups = history.state.groups;
    }
    else {
      this.loadGroups();
    }
    this.loadTasks();
  }

  loadGroups() {
    this.groupService.loadGroups().subscribe(data => {
      this.groups = data;
    });
  }

  selectGroup(group: Group) {
    this.groupService.selectGroup(group);
  }

  backToHome() {
    console.log("route to first screen");
    this.router.navigate(["/home"]);
  }

  loadTasks() {
    this.baseService.getAllTasksByGroupId(this.groupId).subscribe(data => {
      this.tasks = data;
      console.log("tasks: ", this.tasks);
    })
  }

}
