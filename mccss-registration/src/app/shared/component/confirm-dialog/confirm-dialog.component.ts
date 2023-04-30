import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onConfirm(): void {
    this.dialogRef.close({ confirmed: true });
  }

  onCancel() {
    this.dialogRef.close({ confirmed: false });
  }

  get title() {
    return this.data?.title ? this.data.title : 'common.confirmation.title';
  }

  get message() {
    return this.data?.message ? this.data.message : 'common.confirmation.message';
  }

  get confirmLabel() {
    return this.data?.confirmLabel ? this.data?.confirmLabel : 'btn.common.confirm';
  }

  get cancelLabel() {
    return this.data?.cancelLabel ? this.data?.cancelLabel : 'btn.common.cancel';
  }

}
