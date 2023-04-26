import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, combineLatest, BehaviorSubject } from 'rxjs';
import { Product } from './product.service';
import { Store } from '@ngrx/store';
import { selectProducts } from '../reducers';

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

export interface CartProduct extends Product {
  qty: number;
  subTotal: number;
}

export interface DetailedCart {
  cartProducts: CartProduct[];
  totalPrice: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private _http: HttpClient,
    private _store: Store
  ) {}
  private userId: number;
  private detailedCart: BehaviorSubject<DetailedCart> = new BehaviorSubject({
    cartProducts: [],
    totalPrice: 0,
  });
  getBaseCartById(id: number) {
    return this._http.get<Cart>(`https://fakestoreapi.com/carts/${id}`)
  }
  getDetailedCartById(id: number) {
    if (this.userId !== id) {
      this.userId = id;
      combineLatest([
        this.getBaseCartById(id),
        this._store.select(selectProducts),
      ]).subscribe(([baseCart, products]) => {
        this.detailedCart.next(this.generateDetailedCart(baseCart, products));
      });
    }
    return this.detailedCart.asObservable();
  }
  private generateDetailedCart(baseCart: Cart, products: Product[]) {
    const cartProducts: CartProduct[] = baseCart.products.map((prod) => {
      const product = products.find((p) => p.id === prod.productId);
      return {
        ...product,
        qty: prod.quantity,
        subTotal: prod.quantity * product.price,
      };
    });
    const totalPrice = this.findTotalPrice(cartProducts);
    return { cartProducts, totalPrice };
  }
  addToCart(productId: number, quantity: number) {
    const current = this.detailedCart.value;
    const productInCart = current.cartProducts.find(
      (prod) => prod.id === productId
    );
    if (!!productInCart) {
      this.adjustQty(productId, quantity + productInCart.qty);
      alert(`Added ${quantity} to cart`);
    } else {
      this._store.select(selectProducts)
        .pipe(take(1))
        .subscribe((prods) => {
          const productDetails = prods.find((p) => p.id === productId);
          const subTotal = quantity * productDetails.price;
          const productEntry: CartProduct = {
            ...productDetails,
            qty: quantity,
            subTotal,
          };
          const newProducts = current.cartProducts.concat(productEntry);
          this.detailedCart.next({
            cartProducts: newProducts,
            totalPrice: current.totalPrice + subTotal,
          });
        });
      alert(`Added ${quantity} to cart`);
    }
  }
  adjustQty(productId: number, newQuantity: number) {
    const current = this.detailedCart.value;
    if (newQuantity === 0) {
      const newProducts = current.cartProducts.filter(
        (product) => product.id !== productId
      );
      this.detailedCart.next({
        totalPrice: this.findTotalPrice(newProducts),
        cartProducts: newProducts,
      });
    } else {
      const newProducts: CartProduct[] = current.cartProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            qty: newQuantity,
            subTotal: newQuantity * product.price,
          };
        }
        return product;
      });
      this.detailedCart.next({
        totalPrice: this.findTotalPrice(newProducts),
        cartProducts: newProducts,
      });
    }
  }
  findTotalPrice(cartProducts: CartProduct[]) {
    return cartProducts.reduce((acc, product) => {
      acc += product.subTotal;
      return acc;
    }, 0);
  }
}
