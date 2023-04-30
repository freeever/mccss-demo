import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './component/file-uploader/file-uploader.component';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';
import { FileViewerDialogComponent } from './component/file-viewer/file-viewer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    FileUploaderComponent,
    DragAndDropDirective,
    FileViewerDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule
  ],
  exports: [
    FileUploaderComponent,
    DragAndDropDirective,
    FileViewerDialogComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
