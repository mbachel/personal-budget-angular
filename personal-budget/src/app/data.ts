import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Data {
  private api = 'http://localhost:3000/budget';
  private data: any | null = null;

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.api);
  }

  pullData(): any {
    if (this.data) {
      return this.data;
    } else {
      return this.getData();
    }
  }
}
