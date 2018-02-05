import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import * as itf from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public Webhook: itf.Update[];

  constructor(private httpService: HttpService) {}

  public ngOnInit(): void {
    this.httpService.get('/data').then(res => {
      this.Webhook = res;
    });
  }
}
