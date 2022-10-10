import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../model/user.model';
import { URLs } from '../conf/urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public readonly users: Observable<User[]> = this._users.asObservable();

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.httpClient.get(URLs.USER_ENDPOINT) as Observable<User[]>;
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post(URLs.USER_ENDPOINT, user) as Observable<User>;
  }

  public setUsers(users: User[]) {
    this._users.next(users);
  }

}
