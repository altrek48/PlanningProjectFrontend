import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/models/group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plain-screen',
  templateUrl: './plain-screen.component.html',
  styleUrls: ['./plain-screen.component.css']
})
export class PlainScreenComponent implements OnInit {

  groupId: number;
  groups: Group[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.groupId = activateRoute.snapshot.params["groupId"];
    const state = history.state;
    if(history.state.groups) {
      this.groups = history.state.groups;
      console.log("all groups:", this.groups);
    }
  }

  ngOnInit(): void {
    if(this.groups == null) {
      
    }
  }

  selectGroup(group: Group) {
    console.log("selected group:", group);
    this.router.navigate([`/plains/${group.id}`], {
      state: { groups: this.groups}
    });
  }

}
