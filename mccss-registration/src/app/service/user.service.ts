import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../model/user.model';
import { URLs } from '../conf/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.httpClient.post(URLs.USER_ENDPOINT, user) as Observable<User>;
  }
}
