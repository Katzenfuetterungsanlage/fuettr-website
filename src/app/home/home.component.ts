import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public test;

  constructor(private app: AppComponent, private http: HttpService) {}

  ngOnInit() {
    this.app.navOff();
    this.http.get('https://sorogon.duckdns.org:2526').then(res => {
      this.test = res;
    });
  }
}
