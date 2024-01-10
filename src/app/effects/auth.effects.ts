import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, combineLatest, of } from 'rxjs';
import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';;
import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor (private _authService: AuthService, private _actions: Actions, private _router: Router) {}
  
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
}