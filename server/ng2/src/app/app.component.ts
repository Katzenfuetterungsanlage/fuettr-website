import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import * as itf from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public Webhooks: itf.Root;
  public done = false;

  constructor(private http: HttpService) {}

  public ngOnInit(): void {
    this.http.get('/data').then(res => {
      this.Webhooks = res;
      this.done = true;
    });
  }
}
