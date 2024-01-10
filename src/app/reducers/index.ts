import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { productReducer } from './products.reducer';
import { cartReducer } from './cart.reducer'
import { authReducer, AuthState } from './auth.reducer';
import { Product } from '../services/product.service';
import { DetailedCart } from '../services/cart.service';

export interface State {
  products: Product[];
  cart: DetailedCart;
  auth: AuthState;
}

export const selectProducts = createFeatureSelector<Product[]>('products');
export const selectCart = createFeatureSelector<DetailedCart>('cart');
export const selectCartCount = createSelector(selectCart, (cart: DetailedCart) => {
  if (cart?.cartProducts) {
    return cart?.cartProducts.reduce((acc, product) => {
      return acc + product.qty;
    }, 0)
  }
  return 0;
});
export const selectAuth = createFeatureSelector<AuthState>('auth');
export const selectAuthError = createSelector(selectAuth, (authState: AuthState) => authState.error);
export const selectAuthLoading = createSelector(selectAuth, (authState: AuthState) => authState.loading);
export const selectIsLoggedIn = createSelector(selectAuth, (authState: AuthState) => authState.isLoggedIn);
export const selectAuthUser = createSelector(selectAuth, (authState: AuthState) => authState.username);


const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log({state, action})
    return reducer(state, action)
  }
}

export const reducers: ActionReducerMap<State> = {
  products: productReducer,
  cart: cartReducer,
  auth: authReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [debug] : [debug];
