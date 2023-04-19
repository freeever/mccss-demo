import { AbstractControl } from '@angular/forms';

interface FileType {
  extension: string;
  mimeType: string;
}

export function fileTypeValidator(validTypes: FileType[]) {
  return function(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
      const file = control.value as File;
      const fileType = validTypes.find(type => type.extension === getFileExtension(file.name) && type.mimeType === file.type);
      if (!fileType) {
        return { 'fileType': true };
      }
    }
    return null;
  }
}

function getFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf('.');
  return dotIndex === -1 ? '' : filename.substring(dotIndex + 1);
}
