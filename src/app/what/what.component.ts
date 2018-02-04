import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-what',
  templateUrl: './what.component.html',
  styleUrls: ['./what.component.css']
})
export class WhatComponent implements OnInit {
  constructor(private app: AppComponent) {}

  ngOnInit() {
    this.app.navOff();
  }
}
