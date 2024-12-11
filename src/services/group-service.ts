import { BaseService } from './base-service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  private groups: Group[] = [];


  constructor(private baseService: BaseService, private router: Router) { }

  loadGroups(): Observable<Group[]> {
    return this.baseService.getAllGroups().pipe(
      tap(data => {
        console.log("data:", data);
        this.groups = data;
      })
    );
  }

  selectGroup(group: Group){
    // debugger;
    console.log("selected group:", group);
    this.router.navigate([`home/groups/${group.id}`], {
      state: {groups: this.groups}
    });
  }

}
