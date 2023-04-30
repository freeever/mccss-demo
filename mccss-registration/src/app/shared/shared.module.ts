import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FileUploaderComponent } from './component/file-uploader/file-uploader.component';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';
import { FileViewerDialogComponent } from './component/file-viewer/file-viewer-dialog.component';
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
    TranslateModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    FileUploaderComponent,
    DragAndDropDirective,
    FileViewerDialogComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
