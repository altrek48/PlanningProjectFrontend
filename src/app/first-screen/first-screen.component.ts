import { BaseService } from './../../services/base-service';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Group } from 'src/models/group';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group/dialog-add-group.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css'],

})


export class FirstScreenComponent implements OnInit {

  groups: Group[] = [];

  constructor(
    public dialog: MatDialog,
    private baseService: BaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.baseService.getAllGroups().subscribe(data => {
      console.log("data:", data);
      this.groups = data;
  });
  }

  selectGroup(group: Group) {
    console.log("selected group:", group);
    this.router.navigate(['/plains']);
  }

  createNewGroup() {
    const dialogAddGroup = this.dialog.open(DialogAddGroupComponent, {
      width: '400px',
      data: null
    });
    dialogAddGroup.afterClosed().subscribe((result: Group) => {
      if (result.name.length > 5) {
        this.baseService.addNewGroup(result).subscribe(() => {
          this.loadGroups();
        });
      }
      else {
        console.log("Недостаточно символов в названии группы");
      }
    });
  }

}

