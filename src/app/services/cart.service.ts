import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, combineLatest, BehaviorSubject } from 'rxjs';
import { Product } from './product.service';
import { Store } from '@ngrx/store';
import { selectProducts, selectCart } from '../reducers';

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

export interface CartProduct extends Product {
  qty: number;
  subTotal: number;
}

export interface DetailedCart {
  cartProducts: CartProduct[];
  totalPrice: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private _http: HttpClient
  ) {}
  getBaseCartById(id: number) {
    return this._http.get<Cart>(`https://fakestoreapi.com/carts/${id}`)
  }
}
