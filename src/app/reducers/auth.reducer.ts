import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  username: string | undefined;
  error: string | undefined
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  username: undefined,
  error: undefined
}

export const authReducer = createReducer(initialState,
  on(AuthActions.loginUser, () => ({...initialState, loading: true})),
  on(AuthActions.loginSuccess, (state, {username}) => ({...initialState, isLoggedIn: true, username})),
  on(AuthActions.loginFailure, (state, {error}) => ({...initialState, error})),
  on(AuthActions.logout, () => initialState)
)