import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store'
import { CartActions } from '../../actions/cart.actions'
import {
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
  constructor(private store: Store) {}
  @Input() detailedCart: DetailedCart;
  adjustQty(productId: number, newQuantity: number) {
    this.store.dispatch(CartActions.adjustQuantity({productId, newQuantity}))
  }
  findTotalPrice(cartProducts: CartProduct[]) {
    return cartProducts.reduce((acc, product) => {
      acc += product.subTotal;
      return acc;
    }, 0);
  }
}
