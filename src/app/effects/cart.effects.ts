import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, combineLatest, of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { Product, ProductService } from '../services/product.service';
import { CartService, Cart, DetailedCart, CartProduct } from '../services/cart.service';
import { CartActions } from '../actions/cart.actions';
import { selectProducts, selectCart } from '../reducers';

@Injectable()
export class CartEffects {
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private actions: Actions,
    private store: Store
  ) {}
  private generateDetailedCart(baseCart: Cart, products: Product[]): DetailedCart {
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
  findTotalPrice(cartProducts: CartProduct[]) {
    return cartProducts.reduce((acc, product) => {
      acc += product.subTotal;
      return acc;
    }, 0);
  }

  loadDetailedCart = createEffect(() => this.actions.pipe(
    ofType(CartActions.fetchCart),
    switchMap(action => this.productService.getProducts().pipe(
      switchMap(products => 
        this.cartService.getBaseCartById(action.id).pipe(
          map(baseCart => {
            const detailedCart = this.generateDetailedCart(baseCart, products)
            return CartActions.setDetailedCart({cart: detailedCart})
          })
        )
      )
    ))
  ))

  adjustQuantity = createEffect(() => this.actions.pipe(
    ofType(CartActions.adjustQuantity),
    concatLatestFrom(() => this.store.select(selectCart)),
    mergeMap(([action, currentCart]) => {
      const {productId, newQuantity} = action
        let newProducts: CartProduct[] = currentCart.cartProducts;
        if (newQuantity === 0) {
          newProducts = currentCart.cartProducts.filter(
            product => product.id !== productId
          );
        } else {
          newProducts = currentCart.cartProducts.map(product => {
            if (product.id === productId) {
              return {
                ...product,
                qty: newQuantity,
                subTotal: newQuantity * product.price,
              };
            }
            return product;
          })
        }
        return of(CartActions.setDetailedCart({cart: {
          cartProducts: newProducts,
          totalPrice: this.findTotalPrice(newProducts)
        }}))
    })
  ))

  addToCart = createEffect(() => this.actions.pipe(
    ofType(CartActions.addToCart),
    concatLatestFrom(() => [
      this.store.select(selectCart),
      this.store.select(selectProducts)
    ]),
    switchMap(([action, currentCart, products]) =>{
      const { productId, quantity } = action
      const productInCart = currentCart.cartProducts.find(
        prod => prod.id === productId
      );
      let newProducts: CartProduct[] = currentCart.cartProducts;
      if (productInCart) {
        newProducts = currentCart.cartProducts.map(product => {
          if (product.id === productId) {
            const newQuantity = quantity + product.qty
            return {
              ...product,
              qty: newQuantity,
              subTotal: newQuantity * product.price,
            };
          }
          return product;
        })
      } else {
        const productToAdd = products.find(prod => prod.id === productId)
        newProducts = currentCart.cartProducts.concat({
          ...productToAdd,
          qty: quantity,
          subTotal: quantity * productToAdd.price
        })
      }
      alert(`Added ${quantity} to cart`);
      return of(CartActions.setDetailedCart({
        cart: {
          cartProducts: newProducts,
          totalPrice: this.findTotalPrice(newProducts)
        }
      }))
    })
  ))
}