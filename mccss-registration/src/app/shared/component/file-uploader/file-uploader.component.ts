import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ValidatorFn, AbstractControl, Validators, UntypedFormControl } from '@angular/forms';
import { FileTypeValidator } from 'src/app/validator/file-type.validator';
import { FileSizeValidator } from 'src/app/validator/file-size.validator';
import { MatDialog } from '@angular/material/dialog';
import { FileViewerDialogComponent } from '../file-viewer/file-viewer-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileUploaderComponent,
    multi: true
  }]
})
export class FileUploaderComponent implements OnInit, ControlValueAccessor {

  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() id: string;
  @Input() label: string;
  @Input() labelKey: string;
  @Input() showDelete: boolean = true;

  @Input() required: boolean;
  @Input() requiredError: string = "err.common.required";

  @Input() accept: string[];
  @Input() fileTypeError: string = "err.file.type";

  @Input() maxFileSize: number;
  @Input() fileSizeError: string = "err.file.size";

  @Input() formControl: UntypedFormControl;

  @Output() onFileSelected = new EventEmitter<File>();
  @Output() onFileDeleted = new EventEmitter<File>();

  public file: File | any;
  public isDisabled: boolean = false;

  private onChange: Function;
  private onTouched: Function;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.initValidators();
  }

  initValidators() {
    if (this.formControl) {
      const validators: ValidatorFn[] = [];

      if (this.required) {
        validators.push(Validators.required);
      }

      if (this.accept) {
        validators.push(FileTypeValidator(this.accept));
      }

      if (this.maxFileSize) {
        validators.push(FileSizeValidator(this.maxFileSize));
      }

      this.formControl.setValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  public writeValue(file: File): void {
    this.file = file;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.file = file;
      this.onChange(this.file);
      this.onTouched();
      this.onFileSelected.emit(this.file);
    }

  }

  public onDrop(file: any) {
    this.file = file;
    this.onChange(this.file);
    this.onTouched();
    this.onFileSelected.emit(this.file);
  }

  public removeFile(): void {
    this.file = null;
    this.onChange(null);
    this.onTouched();
    const fileInput = document.getElementById(this.id) as HTMLInputElement;
    fileInput.value = ''
    this.onFileDeleted.emit();
  }

  public previewFile() {
    this.dialog.open(FileViewerDialogComponent, {
      data: { file: this.file },
      autoFocus: false
    });
  }

  isInvalid(control: AbstractControl): boolean | null {
    return control && control.invalid && (control.dirty || control.touched);
  }
}
