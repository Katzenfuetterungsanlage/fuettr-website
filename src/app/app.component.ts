import { Component, OnInit, HostListener, ViewChild, Inject, ElementRef, NgZone, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance, PageScrollOptions } from 'ng2-page-scroll';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' //dsgknsdlgknsdpgn
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
  public mobile = false;
  public languages = [{ code: 'en', img: 'assets/en.png' }, { code: 'de', img: 'assets/de.png' }];
  public activelang;
  private int = 1;
  private allowed = false;

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: Document, private titleService: Title, ngZone: NgZone, @Inject(LOCALE_ID) protected localeId: string) {
    if (window.innerWidth < 768) {
      this.mobile = true;
    }
    window.onresize = e => {
      ngZone.run(() => {
        if (window.innerWidth < 768) {
          this.mobile = true;
        } else {
          this.mobile = false;
        }
      });
    };
  }

  public ngOnInit() {
    this.allowed = true;
    if (this.localeId === 'de') {
      this.activelang = 'de';
    } else {
      this.activelang = 'en';
    }
    this.witcher();
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
    this.navShow = false;
    this.witcher();
  }

  @HostListener('mousewheel', ['$event'])
  scroll(event: WheelEvent) {
    if (this.allowed) {
      this.allowed = false;
      if (!this.mobile) {
        if (event.deltaY < -90) {
          if (this.int === 1) {
            this.allowed = true;
            return;
          }
          this.int--;
        }
        if (event.deltaY > 90) {
          if (this.int === 5) {
            this.allowed = true;
            return;
          }
          this.int++;
        }
        this.witcher();
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyup(event: KeyboardEvent) {
    if (!this.mobile) {
      if (event.key === 'ArrowUp') {
        if (this.int === 1) {
          return;
        }
        this.int--;
      }
      if (event.key === 'ArrowDown') {
        if (this.int === 5) {
          return;
        }
        this.int++;
      }
      this.witcher();
    }
  }

  public up() {
    this.int--;
    this.witcher();
  }

  public down() {
    this.int++;
    this.witcher();
  }

  private titleWitcher() {
    if (this.localeId === 'de') {
      switch (this.int) {
        case 1:
          this.titleService.setTitle('Füttr - Home');
          break;
        case 2:
          this.titleService.setTitle('Füttr - Steps');
          break;
        case 3:
          this.titleService.setTitle('Füttr - How it works');
          break;
        case 4:
          this.titleService.setTitle('Füttr - Updates');
          break;
        case 5:
          this.titleService.setTitle('Füttr - Contact');
          break;
      }
    } else {
      switch (this.int) {
        case 1:
          this.titleService.setTitle('Füttr - Home');
          break;
        case 2:
          this.titleService.setTitle('Füttr - Steps');
          break;
        case 3:
          this.titleService.setTitle('Füttr - How it works');
          break;
        case 4:
          this.titleService.setTitle('Füttr - Updates');
          break;
        case 5:
          this.titleService.setTitle('Füttr - Contact');
          break;
      }
    }
  }

  private witcher() {
    this.allowed = false;
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
        break;
      case 2:
        this.active2 = true;
        this.goTo('#what');
        break;
      case 3:
        this.active3 = true;
        this.goTo('#how');
        break;
      case 4:
        this.active4 = true;
        this.goTo('#updates');
        break;
      case 5:
        this.active5 = true;
        this.bottomhidden = true;
        this.goTo('#contact');
        break;
    }
    this.titleWitcher();
  }

  public goTo(anchor: string): void {
    const pageScrollOptions: PageScrollOptions = { document: this.document, scrollTarget: anchor, pageScrollInterruptible: false };
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(pageScrollOptions);
    this.pageScrollService.start(pageScrollInstance);
    setTimeout(() => {
      this.allowed = true;
    }, 300);
  }
}
