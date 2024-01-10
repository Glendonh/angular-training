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
  constructor(private _http: HttpClient, private _router: Router) {}
  logIn({ username, password }: { username: string; password: string }) {
    return this._http.post('https://fakestoreapi.com/auth/login', {
      username,
      password,
    })
  }
}
