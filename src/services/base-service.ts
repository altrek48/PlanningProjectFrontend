import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group';
@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(private http: HttpClient) {}

    getAllGroups(): Observable<Group[]> {
      return this.http.get<Group[]>('api/base/group/get');
    }

    addNewGroup(newGroup: Group): Observable<Group> {
      console.log('addNewStudent');
      return this.http.post<Group>('api/base/group/create', newGroup).pipe();
    }

    getAllTasksByGroupId(groupId: number): Observable<Task[]> {
      return this.http.get<Task[]>(`api/base/task/get/${groupId}`);
    }

}
