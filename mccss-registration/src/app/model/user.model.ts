import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { fileSizeValidator } from "../validator/file-size.validator";
import { fileTypeValidator } from "../validator/file-type.validator";
import { BaseModel } from "./base.model";

const validFileTypes = [
  { extension: 'jpg', mimeType: 'image/jpeg' },
  { extension: 'png', mimeType: 'image/png' },
  { extension: 'pdf', mimeType: 'application/pdf' }
];

export class User extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  avatar: any;

  postalCode: string;

  graduateFrom: string;
  diploma: any;

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
      avatar: new UntypedFormControl('', [fileSizeValidator(5), fileTypeValidator(validFileTypes)]),
      avatarInput: new UntypedFormControl(''),
      postalCode: new UntypedFormControl(this.postalCode,
        { validators: [
          Validators.required, Validators.pattern(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)
        ]}
      ),

      graduateFrom: new UntypedFormControl(this.graduateFrom),
      diploma: new UntypedFormControl('', [fileSizeValidator(5), fileTypeValidator(validFileTypes)]),
      diplomaInput: new UntypedFormControl(''),

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
    formData.append('avatar', v.avatar);
    formData.append('postalCode', v.postalCode);

    formData.append('graduateFrom', v.graduateFrom);
    formData.append('diploma', v.diploma);

    return formData;

    // return new User({
    //   id: v.id,
    //   firstName: v.firstName,
    //   lastName: v.lastName,
    //   email: v.email,
    //   postalCode: v.postalCode,

    //   createdOn: v.createdOn,
    //   updatedOn: v.updatedOn,
    // })
  }

}
