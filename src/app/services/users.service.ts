import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  address: {
    city: string;
    geolocation: { lat: string, long: string },
    number: number;
    street: string;
    zipcode: 'string'
  },
  email: string;
  id: number;
  name: { firstname: string, lastname: string };
  password: string;
  phone: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) {}
  getUsers() {
    return this._http.get<User[]>('https://fakestoreapi.com/users')
  }
}
