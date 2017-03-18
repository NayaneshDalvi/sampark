import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { MY_CONFIG } from '../config';

@Injectable()
export class ProjectService {
	public baseUrl: any;;
	constructor(private http: Http) {
		this.http = http;
		this.baseUrl = MY_CONFIG.BASE_API_URL;
	}

	getProjectContributionDetails(obj) {
		let API_BASE_URL = this.baseUrl;
		obj.command = "gaPrjContr";
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
				})
		});
	}

}



