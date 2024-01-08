import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartCount } from 'src/app/reducers';

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
    this.isAuthenticated = this.authService.getAuthObservable();
    this.cartCount = this._store.select(selectCartCount)
  }
}
