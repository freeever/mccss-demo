import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, AbstractControl, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { NotificationService } from './../service/notification.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { takeWhile, Observable, tap } from 'rxjs';
import { MccsHttpResponse } from '../model/mccs-response.model';
import { avatarAcceptedFileTypes, diplomaAcceptedFileTypes } from '../conf/constants';
import { FormService } from '../shared/service/form.service';
import { UserList } from '../model/user-list.model';
import { MatDialog } from '@angular/material/dialog';
import { FileViewerDialogComponent } from '../shared/component/file-viewer/file-viewer-dialog.component';
import { ConfirmDialogComponent } from '../shared/component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {

  users$: Observable<UserList[]> = this.userService.users;
  response$: Observable<MccsHttpResponse> = this.notificationservice.registrationError;

  alive = true;
  registrationForm: UntypedFormGroup;

  constructor(private el: ElementRef,
              private userService: UserService,
              private notificationservice: NotificationService,
              private formService: FormService,
              private dialog: MatDialog) {
    }

  ngOnInit(): void {
    this.bindForm();
    this.findAllUsers();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  bindForm(): void {
    this.registrationForm = new User().toForm();
  }

  registerFn() {
    this.f.markAllAsTouched();
    if (this.f.valid) {
      const formData = new User().toModel(this.f);
      this.userService.add(formData)
        .pipe(
          takeWhile(() => this.alive),
          tap(() => {
            this.findAllUsers();
            this.createResponse(true);
            this.reset();
          })).subscribe({
            next: () => { },
            error: (err) => this.createResponse(false, err.message)
          });
    } else {
      this.formService.putFocusOnFirstInvalidField(this.el);
    }
  }

  findAllUsers() {
    this.userService.findAll()
      .pipe(
        takeWhile(() => this.alive),
        tap(res => this.userService.setUsers(res))
      ).subscribe(
      )
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.delete(id)
      .pipe(
        takeWhile(() => this.alive),
        tap(() => this.findAllUsers())
      ).subscribe(
      )
  }

  avatarFn(file: File): void {
    this.registrationForm.patchValue({
      avatar: file
    });
  }

  diplomaFn(file: File, i: number): void {
    this.getDiploma(i).patchValue(file);
  }

  addDiploma(): void {
    this.diplomas.push(new UntypedFormControl());
  }

  deleteDiploma(i: number): void {
    this.diplomas.removeAt(i)
  }

  viewAvatar(id: number, contentType: string) {
    const file$ = this.userService.findAvatar(id);
    this.viewFile(file$, contentType);
  }

  viewDiploma(id: number, diplomaId: number, contentType: string) {
    const file$ = this.userService.findDiploma(id, diplomaId);
    this.viewFile(file$, contentType);
  }

  viewFile(file$: Observable<any>, contentType: string) {
    file$.pipe(
      takeWhile(() => this.alive),
      tap((response) => {
        this.dialog.open(FileViewerDialogComponent, {
          data: { file: new Blob([response], { type: contentType }) },
          autoFocus: false
        });
      })
    ).subscribe();
  }

  isInvalid(control: AbstractControl): boolean | null {
    return control && control.touched && control.invalid
  }

  createResponse(success: boolean, message?: string) {
    const response: MccsHttpResponse = {
      success: success,
      messages: message ? [message] : []
    }

    this.notificationservice.setRegistrationError(response);
  }

  reset() {
    this.f?.reset();

    const fileInput = document.getElementById('avatar') as HTMLInputElement;
    fileInput.value = ''

    this.diplomas.clear();
  }

  getDiploma(index: number) {
    return this.diplomas.at(index);
  }

  get canAddDiploma() {
    return this.diplomas.controls.length <= 2;
  }

  get disableAddDiploma() {
    return this.diplomas.value.some((value: any) => !value)
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

  get avatar() {
    return this.f?.get("avatar");
  }

  get diplomas() {
    return this.f?.get('diplomas') as UntypedFormArray;
  }

  get avatarAcceptedFileTypes() {
    return avatarAcceptedFileTypes;
  }

  get diplomaAcceptedFileTypes() {
    return diplomaAcceptedFileTypes;
  }
}
