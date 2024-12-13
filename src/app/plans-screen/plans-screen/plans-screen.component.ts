import { Component, OnInit } from '@angular/core';
import { Task } from './../../../models/task';
import { BaseService } from './../../../services/base-service';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/models/group';
import { Router, Params } from '@angular/router';
import { GroupService } from 'src/services/group-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plans-screen',
  templateUrl: './plans-screen.component.html',
  styleUrls: ['./plans-screen.component.css']
})
export class PlansScreenComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {

  }

}
