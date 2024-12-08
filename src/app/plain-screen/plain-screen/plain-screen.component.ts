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
    this.activateRoute.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
      this.loadTasks();
    });
  }

  loadTasks() {
    this.baseService.getAllTasksByGroupId(this.groupId).subscribe(data => {
      this.tasks = data;
      console.log("tasks: ", this.tasks);
    })
  }

}
