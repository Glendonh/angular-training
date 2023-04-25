import { createActionGroup, props } from "@ngrx/store";
import { Product } from "../services/product.service";

export const ProductApiActions = createActionGroup({
  source: 'ProductApi',
  events: {
    'Fetch Products': props<{products: Product[]}>()
  }
});