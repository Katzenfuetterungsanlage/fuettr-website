import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WhatComponent } from './what/what.component';
import { ContactComponent } from './contact/contact.component';
import { HowComponent } from './how/how.component';
import { UpdatesComponent } from './updates/updates.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, WhatComponent, ContactComponent, HowComponent, UpdatesComponent],
  imports: [BrowserModule, HttpClientModule, HttpModule, FormsModule, BrowserAnimationsModule, Ng2PageScrollModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
