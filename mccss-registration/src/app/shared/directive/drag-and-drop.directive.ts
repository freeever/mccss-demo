import { Directive, Output, EventEmitter, HostListener } from "@angular/core";

@Directive({
  selector: "[fileDrop]",
})
export class DragAndDropDirective {

  @Output() onFileDropped = new EventEmitter<File>();

  constructor() {}

  @HostListener("dragover", ["$event"]) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener("dragleave", ["$event"]) onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener("drop", ["$event"]) onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      this.onFileDropped.emit(file);
    }
  }
}
