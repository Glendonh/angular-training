import 'zone.js';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductApiActions } from './actions/products.actions';


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
  }
}
