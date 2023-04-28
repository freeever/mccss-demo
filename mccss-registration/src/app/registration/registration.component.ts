import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, AbstractControl } from '@angular/forms';
import { NotificationService } from './../service/notification.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { takeWhile, Observable, tap } from 'rxjs';
import { MccsHttpResponse } from '../model/mccs-response.model';
import { AcceptedFileExtensions } from '../conf/constants';

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
              private notificationservice: NotificationService) {
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
      const formData = new User().toModel(this.f);
      this.userService.addUser(formData)
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

  onAvatarFileChange(event: any) {
    this.avatar?.markAsTouched();
    this.avatar?.patchValue(event.target.files[0]);
    console.log('avatar.errors', this.avatar);

  }

  onDiplomaFileChange(event: any) {
    this.diploma?.markAsTouched();
    this.diploma?.patchValue(event.target.files[0]);
  }

  isInvalid(control: AbstractControl): boolean | null {
    return control && control.touched && control.invalid
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

  get avatar() {
    return this.f?.get("avatar");
  }

  get avatarInput() {
    return this.f?.get("avatarInput");
    this.f?.get("avatarInput")
  }

  get postalCode() {
    return this.f?.get("postalCode");
  }

  get diploma() {
    return this.f?.get("diploma");
  }

  get diplomaInput() {
    return this.f?.get("diplomaInput");
  }

  get acceptedFileExt() {
    return AcceptedFileExtensions;
  }
}
