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
import { Product } from '../services/product.service';
import { DetailedCart } from '../services/cart.service';

export const selectProducts = createFeatureSelector<Product[]>('products');
export const selectCart = createFeatureSelector<DetailedCart>('cart');

const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log({state, action})
    return reducer(state, action)
  }
}

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  products: productReducer,
  cart: cartReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [debug] : [debug];
