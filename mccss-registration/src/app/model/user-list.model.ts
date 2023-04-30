export interface FileInfo {
  id: number;
  fileName: string;
  contentType: string;
}

export class UserList {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  postalCode: string;

  avatarFile: FileInfo;
  diplomaFiles: FileInfo[];
}
