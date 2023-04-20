import { render, fireEvent, screen, waitFor } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('shop page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  })
  it('should render shop page', async () => {
    const Shop = await render(ShopComponent)
    expect(Shop).toBeTruthy()
  })
})