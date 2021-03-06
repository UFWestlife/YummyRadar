import {Injectable} from '@angular/core';
import { Customer } from '../models/customer';
import { Review } from '../models/review';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ErrorService} from './error.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()

export class AuthService {

  constructor(private  http: HttpClient, private errorService: ErrorService, private router:Router) {}

  signup(customer: Customer) {
    const body = JSON.stringify(customer);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post('http://localhost:3000/api/auth/signup', body, {headers: headers})
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }

  signin(customer: Customer) {
    const body = JSON.stringify(customer);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post('http://localhost:3000/api/auth/signin', body, {headers: headers})
    .map((response: Response) => {
      console.log(response);
      //console.log(response[0]);
      return response[0];
    })
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }

  destroy(customer : Customer){
    const body = JSON.stringify(customer);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post('http://localhost:3000/api/auth/destroy', body, {headers: headers})
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);

  }

  isLoggedIn(){
    return localStorage.getItem('id') !== null;
  }
}
