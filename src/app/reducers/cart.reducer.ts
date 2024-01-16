import { createReducer, on } from '@ngrx/store';
import { CartActions } from '../actions/cart.actions';
import { AuthActions } from '../actions/auth.actions';
import { DetailedCart } from '../services/cart.service';

const initialState: DetailedCart = undefined;

export const cartReducer = createReducer(
  initialState,
  on(CartActions.setDetailedCart, (state, {cart}) => cart),
  on(AuthActions.logout, () => initialState)
  )