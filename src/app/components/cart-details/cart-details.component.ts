import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
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
export class CartDetailsComponent implements OnChanges {
  constructor(private cartService: CartService) {}
  @Input() detailedCart2: DetailedCart;
  detailedCart: DetailedCart;
  adjustQty(productId: number, newQuantity: number) {
    this.cartService.adjustQty(productId, newQuantity);
  }
  ngOnChanges() {
    if (this.detailedCart2) {
      this.detailedCart = this.detailedCart2;
    }
  }
  findTotalPrice(cartProducts: CartProduct[]) {
    return cartProducts.reduce((acc, product) => {
      acc += product.subTotal;
      return acc;
    }, 0);
  }
}
