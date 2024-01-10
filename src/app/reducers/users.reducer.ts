import { createReducer, on } from '@ngrx/store';
import { UsersActions } from '../actions/users.actions';
import { User } from '../services/users.service';

const initialState: User[] = [];

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state, {users}) => users)
)