import { AbstractControl } from '@angular/forms';

export function FileTypeValidator(accept: string[]) {
  return function(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
      const file = control.value as File;
      const fileType = accept.find(type => type === file.type);

      if (!fileType) {
        return { 'fileType': true };
      }
    }
    return null;
  }
}
