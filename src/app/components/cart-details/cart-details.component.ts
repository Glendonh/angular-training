import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CartService,
  DetailedCart,
  CartProduct,
} from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
  imports: [CommonModule],
})
export class CartDetailsComponent {
  constructor(private cartService: CartService) {}
  @Input() detailedCart: DetailedCart;
  adjustQty(productId: number, newQuantity: number) {
    this.cartService.adjustQty(productId, newQuantity);
  }
  findTotalPrice(cartProducts: CartProduct[]) {
    return cartProducts.reduce((acc, product) => {
      acc += product.subTotal;
      return acc;
    }, 0);
  }
}
