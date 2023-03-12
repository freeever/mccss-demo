import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { BaseModel } from "./base.model";

export class User extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  postalCode: string;

  cookieName: string;
  cookieValue: string;

  constructor(init? : Partial<User>) {
    super();
    Object.assign(this, init);
  }

  toForm() {
    return new UntypedFormGroup({
      id: new UntypedFormControl(this.id),
      firstName: new UntypedFormControl(this.firstName),
      lastName: new UntypedFormControl(this.lastName),
      email: new UntypedFormControl(this.email,
        { validators: [ Validators.required, Validators.email ] }
      ),
      postalCode: new UntypedFormControl(this.postalCode,
        { validators: [
          Validators.required, Validators.pattern(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)
        ]}
      ),
      createdOn: new UntypedFormControl(this.createdOn),
      updatedOn: new UntypedFormControl(this.updatedOn),

      cookieName: new UntypedFormControl(this.cookieName),
      cookieValue: new UntypedFormControl(this.cookieValue)
    });
  }

  toModel(form: UntypedFormGroup) {
    const v = form.getRawValue();
    return new User({
      id: v.id,
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      postalCode: v.postalCode,
      createdOn: v.createdOn,
      updatedOn: v.updatedOn,

      cookieName: v.cookieName,
      cookieValue: v.cookieValue
    })
  }

}
