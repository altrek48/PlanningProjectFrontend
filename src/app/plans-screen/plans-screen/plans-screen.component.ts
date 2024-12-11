import { Component, OnInit } from '@angular/core';
import { Task } from './../../../models/task';
import { BaseService } from './../../../services/base-service';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/models/group';
import { Router, Params } from '@angular/router';
import { GroupService } from 'src/services/group-service';

@Component({
  selector: 'app-plans-screen',
  templateUrl: './plans-screen.component.html',
  styleUrls: ['./plans-screen.component.css']
})
export class PlansScreenComponent implements OnInit {
  groupId: number;
  lastGroupId: number | null = null; //чтобы пофиксить проблему с повторным вызовом loadTasks()
  tasks: Task[] = [];

  constructor(private activateRoute: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private baseService: BaseService) {
      this.groupId = activateRoute.snapshot.params["groupId"];
    }

  ngOnInit(): void {
    this.activateRoute.parent?.params.subscribe((params: Params) => {
      const newGroupId = +params['groupId'];

      //todo после прихода со вкладки расходов все равно не работает корректно, loadTasks() вызывается дважды
      if(this.lastGroupId !== newGroupId) {
        this.lastGroupId = newGroupId;
        this.groupId = newGroupId;
        this.loadTasks();
      }
    });
  }


  loadTasks() {
    this.baseService.getAllTasksByGroupId(this.groupId).subscribe(data => {
      this.tasks = data;
      console.log("tasks: ", this.tasks);
    })
  }

}
