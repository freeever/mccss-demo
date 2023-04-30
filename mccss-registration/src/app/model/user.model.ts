import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { BaseModel } from "./base.model";

export class User extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  postalCode: string;

  avatar: File;
  diplomas: File[];

  constructor(init? : Partial<User>) {
    super();
    Object.assign(this, init);
  }

  toForm() {
    return new UntypedFormGroup({
      id: new UntypedFormControl(this.id),
      firstName: new UntypedFormControl(this.firstName, Validators.required),
      lastName: new UntypedFormControl(this.lastName, Validators.required),
      email: new UntypedFormControl(this.email,
        { validators: [ Validators.required, Validators.email ] }
      ),
      postalCode: new UntypedFormControl(this.postalCode,
        { validators: [
          Validators.required, Validators.pattern(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)
        ]}
      ),

      avatar: new UntypedFormControl(''),

      diplomas: new UntypedFormArray(this.diplomas?.length ? this.diplomas.map(() => new UntypedFormControl('')) : []),

      createdOn: new UntypedFormControl(this.createdOn),
      updatedOn: new UntypedFormControl(this.updatedOn),
    });
  }

  toModel(form: UntypedFormGroup) {
    const v = form.getRawValue();
    const formData = new FormData();
    formData.append('firstName', v.firstName);
    formData.append('lastName', v.lastName);
    formData.append('email', v.email);
    formData.append('postalCode', v.postalCode);

    if (v.avatar) {  // set only file is selected. Cannot set null which will cause error for calling API
      formData.append('avatar', v.avatar);
    }

    v.diplomas.forEach((d: any) => {
        if (d) {
            formData.append('diplomas', d as File);
        }
    });

    return formData;
  }

}
