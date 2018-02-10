import { Component, OnInit, HostListener, ViewChild, Inject, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageScrollConfig, PageScrollService, PageScrollInstance, PageScrollOptions } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public navShow = false;
  public active1 = true;
  public active2 = false;
  public active3 = false;
  public active4 = false;
  public active5 = false;
  public tophidden = true;
  public bottomhidden = false;
  private int = 1;
  @ViewChild('container') private container: ElementRef;

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any, private titleService: Title) {}

  public ngOnInit() {
    this.goTo('#home');
    this.titleService.setTitle('Füttr - Homepage');
    PageScrollConfig.defaultScrollOffset = -10;
    PageScrollConfig.defaultDuration = 200;
  }

  public toggleState() {
    const bool = this.navShow;
    this.navShow = bool === false ? true : false;
  }

  public navOff() {
    this.navShow = false;
  }

  public setInt(page: number) {
    this.int = page;
    this.switcher();
  }

  @HostListener('mousewheel', ['$event'])
  scroll(event: WheelEvent) {
    if (event.deltaY < -90) {
      if (this.int === 1) {
        return;
      }
      this.int--;
    }
    if (event.deltaY > 90) {
      if (this.int === 5) {
        return;
      }
      this.int++;
    }
    this.switcher();
  }

  public up() {
    this.int--;
    this.switcher();
  }

  public down() {
    this.int++;
    this.switcher();
  }

  private switcher() {
    this.active1 = false;
    this.active2 = false;
    this.active3 = false;
    this.active4 = false;
    this.active5 = false;
    this.tophidden = false;
    this.bottomhidden = false;
    switch (this.int) {
      case 1:
        this.active1 = true;
        this.tophidden = true;
        this.goTo('#home');
        this.titleService.setTitle('Füttr - Homepage');
        break;
      case 2:
        this.active2 = true;
        this.goTo('#what');
        this.titleService.setTitle('Füttr - Schritte');
        break;
      case 3:
        this.active3 = true;
        this.goTo('#how');
        this.titleService.setTitle('Füttr - Funktionsweise');
        break;
      case 4:
        this.active4 = true;
        this.goTo('#updates');
        this.titleService.setTitle('Füttr - Updates');
        break;
      case 5:
        this.active5 = true;
        this.bottomhidden = true;
        this.goTo('#contact');
        this.titleService.setTitle('Füttr - Kontakt');
        break;
    }
  }

  public goTo(anchor: string): void {
    const pageScrollOptions: PageScrollOptions = { document: this.document, scrollTarget: anchor, pageScrollInterruptible: false };
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(pageScrollOptions);
    this.pageScrollService.start(pageScrollInstance);
  }
}
