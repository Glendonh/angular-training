import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { ProductApiActions } from '../actions/products.actions';

@Injectable()
export class ProductsEffects {
  constructor(private _productService: ProductService, private actions: Actions) {
  }
  loadProducts = createEffect(() => this.actions.pipe(
      ofType(ProductApiActions.fetchProducts),
      switchMap(() => this._productService.getProducts().pipe(
        map(products => ProductApiActions.loadProducts({products})),
        catchError(() => EMPTY)
      ))
    )
  )
}