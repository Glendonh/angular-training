import {render, fireEvent, screen} from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '../../services/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'

describe('Sign In', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    })
  })
  it('should render sign in', async () => {
    const SignIn = await render(SignInComponent)
    const required = SignIn.queryByText('Required')
    expect(required).toBeNull()
    expect(SignIn).toBeTruthy();
  })
  it('should show required error', async () => {
    const SignIn = await render(SignInComponent)
    const btn = SignIn.getByText('Sign In')
    fireEvent.click(btn)
    const required = SignIn.queryAllByText('Required')
    expect(required.length).toBe(2)
  })
})