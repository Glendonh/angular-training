import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;
  submitted = false;
  error: Observable<string>;
  loading: Observable<boolean>;
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formbuilder.group({ username: '', password: '' });
  }
  onSubmit(val) {
    this.submitted = true;
    if (this.loginForm.status === 'VALID') {
      this.authService.logIn(this.loginForm.getRawValue());
    }
  }

  ngOnInit() {
    this.authService.logOut();
    this.error = this.authService.getError();
    this.loading = this.authService.getLoading();
  }
}
