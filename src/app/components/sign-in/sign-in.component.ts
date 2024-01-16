import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from 'src/app/actions/auth.actions';
import { Observable } from 'rxjs';
import { DevLoginComponent } from '../dev-login/dev-login.component';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading } from 'src/app/reducers';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [ReactiveFormsModule, CommonModule, DevLoginComponent],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;
  submitted = false;
  error: Observable<string>;
  loading: Observable<boolean>;
  isDev = true;
  constructor(
    private formbuilder: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.formbuilder.group({ username: '', password: '' });
  }
  onSubmit(val) {
    this.submitted = true;
    if (this.loginForm.status === 'VALID') {
      this.store.dispatch(AuthActions.loginUser(this.loginForm.getRawValue()));
    }
  }

  ngOnInit() {
    this.error = this.store.select(selectAuthError);
    this.loading = this.store.select(selectAuthLoading);
  }
}
