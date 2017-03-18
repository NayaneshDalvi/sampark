import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MY_CONFIG } from '../config';





@Injectable()
export class AuthService {
  public baseUrl: any;;
  constructor(private http: Http) {
    this.http = http;
    this.baseUrl = MY_CONFIG.BASE_API_URL;
  }


  public login(obj) {
    let API_BASE_URL = this.baseUrl;
    obj.command = "au";
    console.log(obj)
    return new Promise((resolve, reject) => {
      let body = JSON.stringify(obj);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append("Authorization", "Bearer " + obj);
      let options = new RequestOptions({ headers: headers });
      this.http.post(API_BASE_URL, body, options)
        .timeout(MY_CONFIG.TIME_OUT, new Error('timeout exceeded'))
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
          if (data.status === "success") {
            console.log(data)
            resolve(data.oresp)
          } else {
            reject(data)
          }
        }, (error => {
          reject({ 'status': 'error', 'message': 'Unable to Connect to server', 'code': 'CREDOPRO_EX_0001' });
        }),
        () => {
          reject({ 'status': 'error', 'message': 'Unable to Connect to server', 'code': 'CREDOPRO_EX_0001' });
        });
    });

  }

  public register(credentials) {
    if (credentials.promoterCode === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public changePassword(obj) {
    let API_BASE_URL = this.baseUrl;
    obj.command = "changePassword";
    console.log(obj)
    return new Promise((resolve, reject) => {
      let body = JSON.stringify(obj);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append("Authorization", "Bearer " + obj);
      let options = new RequestOptions({ headers: headers });
      this.http.post(API_BASE_URL, body, options)
        .timeout(MY_CONFIG.TIME_OUT, new Error('timeout exceeded'))
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
          if (data.status === "success") {
            console.log(data)
            resolve(data.oresp)
          } else {
            reject(data)
          }
        }, (error => {
          reject({ 'status': 'error', 'message': 'Unable to Connect to server', 'code': 'CREDOPRO_EX_0001' });
        }),
        () => {
          reject({ 'status': 'error', 'message': 'Unable to Connect to server', 'code': 'CREDOPRO_EX_0001' });
        });
    });
  }


  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}