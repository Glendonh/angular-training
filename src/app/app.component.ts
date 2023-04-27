import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductApiActions } from './actions/products.actions';
import { CartActions } from './actions/cart.actions';


@Component({
  selector: 'my-app',
  template: `
    <app-navbar [name]="name"></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  name = 'Extra Fake Store';
  constructor(private _store: Store) {}
  ngOnInit(): void {
      this._store.dispatch(ProductApiActions.fetchProducts())
      this._store.dispatch(CartActions.fetchCart({id: 1}))
  }
}
