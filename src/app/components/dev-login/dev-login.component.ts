import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-dev-login',
  templateUrl: './dev-login.component.html',
  styleUrls: ['./dev-login.component.css'],
  imports: [CommonModule]
})
export class DevLoginComponent {
  constructor(
    private _usersService: UsersService,
    private _authService: AuthService
  ) {}
  users: Observable<any[]>;
  getUsers() {
    this.users = this._usersService.getUsers();
  }
  selectUser(user: any) {
    const {username, password} = user
    this._authService.logIn({username, password})
  }
}
