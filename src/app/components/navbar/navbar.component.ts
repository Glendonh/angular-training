import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartCount, selectIsLoggedIn } from 'src/app/reducers';
import { AuthActions } from 'src/app/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() name: string;
  constructor(private authService: AuthService, private _store: Store) {}
  isAuthenticated: Observable<boolean>;
  cartCount: Observable<number>;

  ngOnInit() {
    this.isAuthenticated = this._store.select(selectIsLoggedIn);
    this.cartCount = this._store.select(selectCartCount)
  }

  handleLogout() {
    this._store.dispatch(AuthActions.logout())
  }
}
