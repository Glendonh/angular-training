import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Product, ProductService } from './product.service';

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: [{ productId: number; quantity: number }];
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
    private _productService: ProductService
  ) {}
  private rawCart: Observable<Cart>;
  private userId: number;
  private detailedCart: BehaviorSubject<DetailedCart> = new BehaviorSubject({
    cartProducts: [],
    totalPrice: 0,
  });
  getDetailedCartById(id: number) {
    if (this.userId !== id) {
      this.userId = id;
      combineLatest([
        this._http.get<Cart>(`https://fakestoreapi.com/carts/${id}`),
        this._productService.getProducts(),
      ]).subscribe(([baseCart, products]) => {
        this.detailedCart.next(this.generateDetailedCart(baseCart, products));
      });
    }
    return this.detailedCart.asObservable();
  }
  generateDetailedCart(baseCart: Cart, products: Product[]) {
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
