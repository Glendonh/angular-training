import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formbuilder.group({ email: '', password: '' });
  }
  onSubmit(val) {
    this.submitted = true;
    console.log(this.loginForm);
    if (this.loginForm.status === 'VALID') {
      this.authService.logIn();
      this.router.navigate(['shop']);
    }
  }

  ngOnInit() {}
}
