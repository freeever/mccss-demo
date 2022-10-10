import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MccsHttpResponse } from '../model/mccs-response.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _registrationError: BehaviorSubject<MccsHttpResponse> = new BehaviorSubject({});

  public readonly registrationError: Observable<MccsHttpResponse> = this._registrationError.asObservable();

  public setRegistrationError(resp: MccsHttpResponse) {
    this._registrationError.next(resp);
  }
}
