import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group';
import { Task } from 'src/models/task';


@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(private http: HttpClient) {}

    getAllGroups(): Observable<Group[]> {
      return this.http.get<Group[]>('api/base/group/get');
    }

    addNewGroup(newGroup: Group): Observable<Group> {
      return this.http.post<Group>('api/base/group/create', newGroup).pipe();
    }

    getAllTasksByGroupId(groupId: number): Observable<Task[]> {
      return this.http.get<Task[]>(`api/base/task/get/${groupId}`);
    }

    addNewTask(newTask: Task, groupId: number): Observable<Task> {
      return this.http.post<Task>(`api/base/task/create/${groupId}`, newTask);
    }

    getTask(taskId: number): Observable<Task> {
      return this.http.get<Task>(`api/base/task/getOne/${taskId}`);
    }

    changeTask(task: Task): Observable<Task> {
      return this.http.put<Task>(`api/base/task/change`, task);
    }

}
