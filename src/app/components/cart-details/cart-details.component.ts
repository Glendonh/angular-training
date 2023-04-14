import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
import { Cart } from '../../services/cart.service';

interface CartProduct extends Product {
  qty: number;
  subTotal: number;
}

interface DetailedCart {
  cartProducts: CartProduct[];
  totalPrice: number;
}

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
  detailedCart: DetailedCart;
  adjustQty(productId: number, newQuantity: number) {
    if (newQuantity === 0) {
      const newProducts = this.detailedCart.cartProducts.filter(
        (product) => product.id !== productId
      );
      this.detailedCart = {
        totalPrice: this.findTotalPrice(newProducts),
        cartProducts: newProducts,
      };
    } else {
      const newProducts: CartProduct[] = this.detailedCart.cartProducts.map(
        (product) => {
          if (product.id === productId) {
            return {
              ...product,
              qty: newQuantity,
              subTotal: newQuantity * product.price,
            };
          }
          return product;
        }
      );
      this.detailedCart = {
        totalPrice: this.findTotalPrice(newProducts),
        cartProducts: newProducts,
      };
    }
  }
  ngOnChanges() {
    if (this.cart && this.products) {
      const cartProducts: CartProduct[] = this.cart.products.map((prod) => {
        const product = this.products.find((p) => p.id === prod.productId);
        return {
          ...product,
          qty: prod.quantity,
          subTotal: prod.quantity * product.price,
        };
      });
      const totalPrice = this.findTotalPrice(cartProducts);
      this.detailedCart = { cartProducts, totalPrice };
    }
  }
  findTotalPrice(cartProducts: CartProduct[]) {
    return cartProducts.reduce((acc, product) => {
      acc += product.subTotal;
      return acc;
    }, 0);
  }
}
