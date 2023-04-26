import { render } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { CartDetailsComponent } from './cart-details.component';
import { of } from 'rxjs';
import { provideMockStore } from "@ngrx/store/testing"

class MockHttp {
  get(route: string) {
    console.log({route})
    return of([])
  }
}

describe('cart-details', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useClass: MockHttp},
        provideMockStore()
      ]
    })
  })
  it('should render cart-details', async () => {
    const CartDetails = await render(CartDetailsComponent);
    expect(CartDetails).toBeTruthy();
  })
})