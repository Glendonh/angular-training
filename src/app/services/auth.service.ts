import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const works = {
  username: 'johnd',
  password: 'm38rmF$',
};

@Injectable()
export class AuthService {
  private authSubject = new BehaviorSubject(false);
  private _error = new BehaviorSubject<string>('');
  private _loading = new BehaviorSubject(false);
  constructor(private _http: HttpClient, private _router: Router) {}
  getAuthObservable() {
    return this.authSubject.asObservable();
  }
  getIsAutheticated() {
    return this.authSubject;
  }
  getError() {
    return this._error.asObservable();
  }
  getLoading() {
    return this._loading.asObservable();
  }
  logIn({ username, password }: { username: string; password: string }) {
    this._error.next('');
    this._loading.next(true);
    this._http
      .post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      })
      .subscribe({
        next: () => {
          this.authSubject.next(true);
          this._router.navigate(['shop']);
          this._loading.next(false);
        },
        error: (err) => {
          this._error.next(err.error);
          this._loading.next(false);
        },
      });
  }
  logOut() {
    this.authSubject.next(false);
  }
}
