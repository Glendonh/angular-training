import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
import { Cart } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
  imports: [CommonModule],
})
export class CartDetailsComponent {
  constructor() {}
  @Input() products: Product[];
  @Input() cart: Cart;
  detailedCart;
  ngOnChanges() {
    if (this.cart && this.products) {
      const cartProducts = this.cart.products.map((prod) => {
        const product = this.products.find((p) => p.id === prod.productId);
        return {
          ...product,
          qty: prod.quantity,
          subTotal: prod.quantity * product.price,
        };
      });
      const totalPrice = cartProducts.reduce((acc, product) => {
        acc += product.subTotal;
        return acc;
      }, 0);
      this.detailedCart = { cartProducts, totalPrice };
    }
  }
}
