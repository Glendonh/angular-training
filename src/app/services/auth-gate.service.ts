import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectIsLoggedIn } from '../reducers';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthGateService  implements OnInit {
  constructor(private router: Router, private store: Store) {}
  ngOnInit() {
    console.log('initing');
  }
  canActivate() {
    return this.store.pipe(
      select(selectIsLoggedIn),
      tap(isLogged => {
        if(!isLogged) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
