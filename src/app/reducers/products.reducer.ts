import { createReducer, on } from '@ngrx/store';
import { ProductApiActions } from '../actions/products.actions';
import { Product } from '../services/product.service';

const initialState: Product[] = []

export const productReducer = createReducer(
  initialState,
  on(ProductApiActions.fetchProducts, (state, {products}) => products)
);