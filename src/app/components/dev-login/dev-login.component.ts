import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UsersService } from 'src/app/services/users.service';
import { AuthActions } from 'src/app/actions/auth.actions';
import { State } from '@ngrx/store';
import { selectUsers } from 'src/app/reducers';
import { User } from 'src/app/services/users.service';

@Component({
  standalone: true,
  selector: 'app-dev-login',
  templateUrl: './dev-login.component.html',
  styleUrls: ['./dev-login.component.css'],
  imports: [CommonModule]
})
export class DevLoginComponent implements OnInit {
  constructor(
    private _store: Store
  ) {}
  users: Observable<User[]>;
  showTable = false;
  ngOnInit() {
    this.users = this._store.select(selectUsers)
  }
  getUsers() {
    this.showTable = !this.showTable;
  }
  selectUser(user: any) {
    const {username, password} = user
    this._store.dispatch(AuthActions.loginUser({username, password}))
  }
}
