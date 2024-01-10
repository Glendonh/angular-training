import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { UsersActions } from '../actions/users.actions';

@Injectable()
export class UsersEffects {
  constructor(private _actions: Actions, private _usersService: UsersService) {}
  loadUsers = createEffect(() => this._actions.pipe(
    ofType(UsersActions.fetchUsers),
    switchMap(() => this._usersService.getUsers().pipe(
      map(users => UsersActions.loadUsers({users})),
      catchError(() => EMPTY)
    ))
  ))
}