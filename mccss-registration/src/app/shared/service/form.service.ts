import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  putFocusOnFirstInvalidField(elementRef: ElementRef): void {
    const invalidElements = elementRef.nativeElement.querySelectorAll("input.is-invalid, input.ng-invalid, span.ng-invalid, textarea.ng-invalid, select.ng-invalid, select.is-invalid, .control.ng-invalid");
    if (invalidElements.length > 0) {
      const item = invalidElements[0];
      item.focus();
      item.blur();
      if (item.tagName.includes('APP')) {
        if (item.querySelector('input')) {
          item.querySelector('input').focus()
        }
        else {
          item.querySelector('select').focus()
        }
      }
      else if (item.tagName.includes('SPAN')) {
        if (item.querySelector('input.ng-invalid')) {
          item.querySelector('input.ng-invalid').focus()
        }
        else {
          item.querySelector('select')?.focus()
        }
      }
      else {
        item.focus();
      }
      invalidElements[0].focus();
      setTimeout(() => {
        invalidElements[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
    }
  }
}
