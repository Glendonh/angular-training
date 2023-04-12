import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [ReactiveFormsModule],
})
export class SignInComponent implements OnInit {
  loginForm;
  constructor(private formbuilder: FormBuilder) {
    this.loginForm = this.formbuilder.group({ email: '', password: '' });
  }
  onSubmit(val) {
    console.log('loggin', val);
  }

  ngOnInit() {}
}
