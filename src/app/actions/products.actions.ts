import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { Product } from "../services/product.service";

export const ProductApiActions = createActionGroup({
  source: 'ProductApi',
  events: {
    'Fetch Products': emptyProps(),
    'Load Products': props<{products: Product[]}>()
  }
});