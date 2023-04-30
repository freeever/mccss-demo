import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../model/user.model';
import { URLs } from '../conf/urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserList } from '../model/user-list.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<UserList[]> = new BehaviorSubject<UserList[]>([]);
  public readonly users: Observable<UserList[]> = this._users.asObservable();

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<UserList[]> {
    return this.httpClient.get(URLs.USER_ENDPOINT) as Observable<UserList[]>;
  }

  add(data: FormData): Observable<User> {
    return this.httpClient.post(URLs.USER_ENDPOINT, data) as Observable<User>;
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete(`${URLs.USER_ENDPOINT}/${id}`) as Observable<boolean>;
  }

  findAvatar(id: number): Observable<any> {
    return this.httpClient.get(`${URLs.USER_ENDPOINT}/avatar/${id}`, { responseType: 'blob' });
  }

  findDiploma(id: number, diplomaId: number): Observable<any> {
    return this.httpClient.get(`${URLs.USER_ENDPOINT}/diploma/${id}/${diplomaId}`, { responseType: 'blob' });
  }

  public setUsers(users: UserList[]) {
    this._users.next(users);
  }

}
