import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGateService  implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    console.log('initing');
  }
  canActivate() {
    if (this.authService.getIsAutheticated().value) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
