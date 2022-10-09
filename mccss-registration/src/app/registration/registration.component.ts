import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { catchError, of, takeWhile } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {

  alive = true;
  registrationForm: FormGroup;
  errors: string[] = [];
  changeDetectorRef: ChangeDetectorRef;
  constructor(injector: Injector,
    private userService: UserService) {
      this.changeDetectorRef = injector.get(ChangeDetectorRef);
    }

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
    this.resetErrors();
    if (this.f.valid) {
      const user = new User().toModel(this.f);
      this.userService.addUser(user)
        .pipe(
          takeWhile(() => this.alive),
          catchError(err => {
            this.errors.push(err.message);
            this.cd();
            return of(err.message);
          })
        )
        .subscribe(
        );
    } else {
      Object.keys(this.f.controls).forEach(field => {
        const control = this.f.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  private resetErrors() {
    this.errors = [];
  }

  cd() {
    this.changeDetectorRef.markForCheck()
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
