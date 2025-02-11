import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group';
import { Profile } from 'src/models/profile';
import { Purchase } from 'src/models/purchase';
import { Task } from 'src/models/task';
import { User } from 'src/models/user';


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

    getTask(groupId: number, taskId: number): Observable<Task> {
      return this.http.get<Task>(`api/base/task/getOne/${groupId}/${taskId}`);
    }

    changeTask(task: Task, groupId: number, taskId: number): Observable<Task> {
      return this.http.put<Task>(`api/base/task/change/${groupId}/${taskId}`, task);
    }

    deleteTask(groupId: number, taskId: number): Observable<Number>{
      return this.http.delete<Number>(`api/base/task/delete/${groupId}/${taskId}`)
    }

    addNewPurchase(purchase: Purchase, groupId: number): Observable<Purchase> {
      return this.http.post<Purchase>(`api/base/purchase/create/${groupId}`, purchase)
    }

    getAllPurchasesByGroupId(groupId: number): Observable<Purchase[]> {
      return this.http.get<Purchase[]>(`api/base/purchase/getAll/${groupId}`)
    }

    getPurchase(groupId:number, purchaseId: number): Observable<Purchase> {
      return this.http.get<Purchase>(`api/base/purchase/get/${groupId}/${purchaseId}`)
    }

    login(loginUser: User): Observable<{token: string}> {
      return this.http.post<{token: string}>(`api/login`, loginUser);
    }

    registration(newUser: User): Observable<User> {
      return this.http.post<User>('api/register', newUser);
    }

    isGroupCreator(groupId: number): Observable<boolean> {
      return this.http.get<boolean>(`api/base/group/isCreator/${groupId}`);
    }

    addUserToGroup(groupId: number, username: String): Observable<void> {
      return this.http.post<void>(`api/base/user/add/${groupId}`, username);
    }

    createPurchaseInTask(purchase: Purchase, groupId: number, taskId: number): Observable<Purchase> {
      return this.http.post<Purchase>(`api/base/purchase/create/${groupId}/${taskId}`, purchase);
    }

    getPurchaseIdByProductId(productId: number): Observable<number> {
      return this.http.get<number>(`api/base/purchase/getPurchaseId/${[productId]}`);
    }

    getProfileInfo(): Observable<Profile> {
      return this.http.get<Profile>(`api/base/user/getInfo`);
    }

    getUsersProfileByGroupId(groupId: number): Observable<Profile[]> {
      return this.http.get<Profile[]>(`api/base/user/getProfilesInGroup/${groupId}`);
    }

    getUsername(): Observable<string> {
      return this.http.get(`api/base/user/getUsername`, { responseType: 'text' });
    }

    removeUserFromGroup(groupId: Number, userId: Number): Observable<Number> {
      return this.http.delete<Number>(`api/base/group/${groupId}/removeUser/${userId}`);
    }

    uploadNewAvatar(avatar: FormData): Observable<String> {
      return this.http.post<String>(`api/base/avatar/upload`, avatar, {responseType: 'text' as 'json'});
    }

    updateEmail(email: String): Observable<String> {
      return this.http.put<String>(`api/base/user/editEmail`, email, {responseType: 'text' as 'json'});
    }
}
