import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'//Solo afecta a img
})
export class ImgBrokenDirective {

  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement
    console.log('This image cant load -->',this.elHost);
    elNative.src='../../../assets/images/img-broken.jpg'
  }

  constructor(private elHost:ElementRef) {


  }

}
