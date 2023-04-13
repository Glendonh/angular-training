import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() name: string;
  constructor(private authService: AuthService) {}
  isAuthenticated: Observable<boolean>;

  ngOnInit() {
    this.isAuthenticated = this.authService.getAuthObservable();
  }
}
