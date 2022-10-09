import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {

  alive = true;
  registrationForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.bindForm();
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
          takeWhile(() => this.alive)
        )
        .subscribe();
    } else {
      Object.keys(this.f.controls).forEach(field => { // {1}
        const control = this.f.get(field);            // {2}
        control?.markAsTouched({ onlySelf: true });    // {3}
      });
    }
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
}
