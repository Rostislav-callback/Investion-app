import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoansDataService {

  constructor(private http: HttpClient) {}

  getDataAll(){
    return this.http.get('http://localhost:3000/loans');
  }

  getData(id:any) {
    return this.http.get(`http://localhost:3000/loans/${id}`);
  }

  getCash() {
    return this.http.get(`http://localhost:3000/user_fund`);
  }

  updateData(data: any) {
    return this.http.put(`http://localhost:3000/user_fund`, data);
  }
}
