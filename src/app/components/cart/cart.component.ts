import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Cart } from '../../services/cart.service';
import { ProductService, Product } from '../../services/product.service';
import { Observable } from 'rxjs';
import { CartDetailsComponent } from '../cart-details/cart-details.component';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, CartDetailsComponent],
})
export class CartComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _productService: ProductService
  ) {}
  cart: Observable<Cart>;
  products: Observable<Product[]>;

  ngOnInit() {
    this.cart = this._cartService.getCartById(1);
    this.products = this._productService.getProducts();
  }
}
