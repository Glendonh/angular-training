import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { DetailedCart } from "../services/cart.service";

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Fetch Cart': props<{id: number}>(),
    'Set Detailed Cart': props<{cart: DetailedCart}>(),
    'Adjust Quantity': props<{productId: number, newQuantity: number}>(),
    'Add To Cart': props<{ productId: number, quantity: number }>()
  }
})