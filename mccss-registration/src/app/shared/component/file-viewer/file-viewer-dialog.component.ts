import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-demo-dialog',
  template: `
      <div mat-dialog-content class="message-container" >
          <ng-container *ngIf = "isImage; else nonImage">
              <img [src] = "fileUrl">
          </ng-container>
          <ng-template #nonImage>
              <iframe [src] = "fileUrl" frameborder="0" width="800px" height="600px"></iframe>
          </ng-template>
      </div>
  `,
  styles: [`
      .mat-dialog-container {
          width: 99%;
          padding-top: 5px !important;
          padding-right: 5px !important;
      };
      .message-container {
          width: 100% !important;
          height: 95% !important;
          text-align: center;
      };
  `]
})
export class FileViewerDialogComponent {
  isImage: boolean;
  fileUrl: SafeUrl;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private sanitizer: DomSanitizer) {

      this.isImage = data.file?.type.startsWith('image/');

      const blob = this.data.file;
      const blobUrl = URL.createObjectURL(blob);
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }
}
