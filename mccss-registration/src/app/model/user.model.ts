import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseModel } from "./base.model";

export class User extends BaseModel {
  firstName: String;
  lastName: String;
  email: String;
  postalCode: String;

  constructor(init? : Partial<User>) {
    super();
    Object.assign(this, init);
  }

  toForm() {
    return new FormGroup({
      id: new FormControl(this.id),
      firstName: new FormControl(this.firstName),
      lastName: new FormControl(this.lastName),
      email: new FormControl(this.email,
        { validators: [ Validators.required, Validators.email ] }
      ),
      postalCode: new FormControl(this.postalCode,
        { validators: [
          Validators.required, Validators.pattern(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)
        ]}
      ),
      createdOn: new FormControl(this.createdOn),
      updatedOn: new FormControl(this.updatedOn)
    });
  }

  toModel(form: FormGroup) {
    const v = form.getRawValue();
    return new User({
      id: v.id,
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      postalCode: v.postalCode,
      createdOn: v.createdOn,
      updatedOn: v.updatedOn
    })
  }

}
