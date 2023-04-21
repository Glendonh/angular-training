import { render } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CartDetailsComponent } from './cart-details.component';
import { of } from 'rxjs';

class MockHttp {
  get(route: string) {
    console.log({route})
    return of([])
  }
}

describe('cart-details', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useClass: MockHttp}]
    })
  })
  it('should render cart-details', async () => {
    const CartDetails = await render(CartDetailsComponent);
    expect(CartDetails).toBeTruthy();
  })
})