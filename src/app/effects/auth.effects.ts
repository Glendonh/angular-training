import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, combineLatest, of } from 'rxjs';
import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';;
import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { CartActions } from '../actions/cart.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthEffects {
  constructor (
    private _authService: AuthService,
    private _userService: UsersService,
    private _actions: Actions,
    private _router: Router
  ) {}
  
  handleLogin = createEffect(() => this._actions.pipe(
    ofType(AuthActions.loginUser),
    switchMap(action => {
      const {username, password} = action;
      return this._authService.logIn({username, password}).pipe(
        map(() => AuthActions.loginSuccess({username})),
        tap(() => {
          this._router.navigate(['shop'])
        }),
        catchError((e) => of(AuthActions.loginFailure({error: e.error})))
      )
    })
  ))

  findCartId = createEffect(() => this._actions.pipe(
    ofType(AuthActions.loginSuccess),
    switchMap(action => this._userService.getUsers().pipe(
      map(users => {
        console.log({username: action.username, users})
        const activeUserId = users.find(user => user.username === action.username).id;
        return CartActions.fetchCart({id: activeUserId})
      })
    ))
  ))

}