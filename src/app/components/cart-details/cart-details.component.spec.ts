import { render } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CartDetailsComponent } from './cart-details.component';

describe('cart-details', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  })
  it('should render cart-details', async () => {
    const CartDetails = await render(CartDetailsComponent);
    expect(CartDetails).toBeTruthy();
  })
})