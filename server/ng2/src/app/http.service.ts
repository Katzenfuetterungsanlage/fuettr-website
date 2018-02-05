import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public async get(resource: string, options?: { headers?: HttpHeaders }): Promise<any> {
    return await this.httpGet(resource, options).catch(this.handleError);
  }

  private async httpGet(resource: string, options?: { headers?: HttpHeaders }): Promise<any> {
    if (!resource) {
      return Promise.reject(new Error('invalid arguments'));
    }
    const headers =
      options && options.headers
        ? options.headers
        : new HttpHeaders({
            'Content-Type': 'application/json'
          });
    const httpClientOptions = { headers: headers };
    return await this.httpClient
      .get(resource, httpClientOptions)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
