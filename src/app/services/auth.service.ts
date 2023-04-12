import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  constructor() {}
  getIsAutheticated() {
    return this.isAuthenticated;
  }
  logIn() {
    this.isAuthenticated = true;
  }
  logOut() {
    this.isAuthenticated = false;
  }
}
