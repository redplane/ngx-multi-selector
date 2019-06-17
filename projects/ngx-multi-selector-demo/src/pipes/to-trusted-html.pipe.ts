import {DomSanitizer} from '@angular/platform-browser';
import {Pipe} from '@angular/core';

@Pipe({name: 'toTrustedHtml'})
export class ToTrustedHtmlPipe {
  constructor(private sanitizer: DomSanitizer) {
  }

  //#region Methods

  public transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }

  //#endregion
}
