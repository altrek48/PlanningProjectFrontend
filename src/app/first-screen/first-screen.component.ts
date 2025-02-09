import { BaseService } from './../../services/base-service';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Group } from 'src/models/group';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group/dialog-add-group.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/services/group-service';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css'],

})

export class FirstScreenComponent implements OnInit {

  groups: Group[] = [];
  //Нужно для того, чтобы менять кнопку (добавления группы / возвращения на 1 скрин) в зависимости от компоненты
  isNotFirstScreen = false;

  constructor(
    public dialog: MatDialog,
    private baseService: BaseService,
    private groupService: GroupService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadGroups();
    this.isNotFirstScreen = this.router.url !== '/home'
    this.router.events.subscribe(() => {
      this.isNotFirstScreen = this.router.url !== '/home';
    });
  }

  loadGroups() {
    this.groupService.loadGroups().subscribe(data => {
      this.groups = data;
    });
  }

  selectGroup(group: Group) {
    // debugger;
    this.groupService.selectGroup(group);
  }

  createNewGroup() {
    const dialogAddGroup = this.dialog.open(DialogAddGroupComponent, {
      width: '400px',
      data: null,
    });
    dialogAddGroup.afterClosed().subscribe((result: Group) => {
      if (result.name.length >= 2) {
        this.baseService.addNewGroup(result).subscribe(() => {
          this.loadGroups();
        });
      }
      else {
        console.log("Недостаточно символов в названии группы");
      }
    });
  }

  backToHome() {
    console.log("route to first screen");
    this.router.navigate(["/home"]);
  }

}

