import { Component, OnInit } from '@angular/core';
import { Task } from 'src/models/task';
import { BaseService } from 'src/services/base-service';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/models/group';
import { Router, Params } from '@angular/router';
import { GroupService } from 'src/services/group-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.css']
})
export class AllPlansComponent implements OnInit {

  groupId: number;
  tasks: Task[] = [];
  subscription: Subscription | null | undefined = null; // для отписки

    constructor(
      private activateRoute: ActivatedRoute,
      private baseService: BaseService,
      private router: Router) {
        this.groupId = activateRoute.snapshot.params["groupId"];
      }

    ngOnInit(): void {
      this.subscription = this.activateRoute.parent?.parent?.params.subscribe((params: Params) => {
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

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

    routeToThisPlan(taskId: number | null) {
      if(taskId === null) {
        console.log("Id плана === null");
      }
      else this.router.navigate([`home/${this.groupId}/plans/${taskId}`])
    }

  }
