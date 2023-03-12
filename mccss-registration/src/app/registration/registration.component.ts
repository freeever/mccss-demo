import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { NotificationService } from './../service/notification.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { catchError, of, takeWhile, Observable, tap } from 'rxjs';
import { MccsHttpResponse } from '../model/mccs-response.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {

  users$: Observable<User[]> = this.userService.users;
  response$: Observable<MccsHttpResponse> = this.notificationservice.registrationError;

  alive = true;
  registrationForm: UntypedFormGroup;

  constructor(injector: Injector,
              private userService: UserService,
              private notificationservice: NotificationService,
              private cookieService: CookieService) {
    }

  ngOnInit(): void {
    this.bindForm();
    this.findAllUsers();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  bindForm(): void {
    this.registrationForm = new User().toForm();
  }

  registerFn() {
    if (this.f.valid) {
      const user = new User().toModel(this.f);
      this.userService.addUser(user)
        .pipe(
          takeWhile(() => this.alive),
        ).subscribe({
          next: (res) => {
            this.findAllUsers();
            this.createResponse(true);
            this.f.reset();
          },
          error: (err) => this.createResponse(false, err.message)
        });
    } else {
      Object.keys(this.f.controls).forEach(field => {
        const control = this.f.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  findAllUsers() {
    this.userService.findAll()
      .pipe(
        takeWhile(() => this.alive),
        tap(res => this.userService.setUsers(res))
      ).subscribe(
      )
  }

  addCookie() {
    this.cookieService.put(this.cookieName, this.cookieValue);
  }

  delCookie() {
    this.cookieService.remove(this.cookieName);
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  createResponse(success: boolean, message?: string) {
    const response: MccsHttpResponse = {
      success: success,
      messages: message ? [message] : []
    }

    this.notificationservice.setRegistrationError(response);
  }

  get f() {
    return this.registrationForm;
  }

  get firstName() {
    return this.f?.get("firstName");
  }

  get lastName() {
    return this.f?.get("lastName");
  }

  get email() {
    return this.f?.get("email");
  }

  get postalCode() {
    return this.f?.get("postalCode");
  }

  get cookieName(): string {
    return this.f?.get("cookieName")?.value;
  }

  get cookieValue(): string {
    return this.f?.get("cookieValue")?.value;
  }
}
