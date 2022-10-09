import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _registrationError: BehaviorSubject<any> = new BehaviorSubject(undefined);

  public readonly registrationError: Observable<any> = this._registrationError.asObservable();

  public setRegistrationError(err: any) {
    this._registrationError.next(err);
  }

  constructor() { }
}
