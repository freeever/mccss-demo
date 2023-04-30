import { AbstractControl } from '@angular/forms';

export function FileSizeValidator(maxSizeInMB: number) {
  return function(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
      const file = control.value as File;
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxSizeInMB) {
        return { 'fileSize': true };
      }
    }
    return null;
  }
}
